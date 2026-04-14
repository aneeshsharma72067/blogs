<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
  }>(),
  {
    placeholder: 'Begin the narrative...',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editorRef = ref<HTMLElement | null>(null)

const syncFromEditor = () => {
  emit('update:modelValue', editorRef.value?.innerHTML || '')
}

const command = (name: string, value?: string) => {
  editorRef.value?.focus()
  document.execCommand(name, false, value)
  syncFromEditor()
}

const addLink = () => {
  const url = window.prompt('Enter URL')
  if (!url) return
  command('createLink', url)
}

const setBlock = (tag: 'blockquote' | 'pre' | 'p') => {
  editorRef.value?.focus()

  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return

  // Walk up from the current node to find if we're already inside the target block
  let node: Node | null = selection.getRangeAt(0).commonAncestorContainer
  if (node.nodeType === Node.TEXT_NODE) node = node.parentElement

  const isInsideTag = (el: Node | null, tagName: string): HTMLElement | null => {
    while (el && el !== editorRef.value) {
      if ((el as HTMLElement).tagName?.toLowerCase() === tagName) return el as HTMLElement
      el = el.parentNode
    }
    return null
  }

  const existing = isInsideTag(node, tag)

  if (existing) {
    // Toggle off: unwrap the block element, replacing it with its children
    const parent = existing.parentNode
    if (!parent) return
    while (existing.firstChild) {
      parent.insertBefore(existing.firstChild, existing)
    }
    parent.removeChild(existing)
  } else {
    // Toggle on: use execCommand for standard blocks, manual wrap for <pre>
    if (tag === 'pre') {
      // execCommand formatBlock with 'pre' is unreliable cross-browser for code blocks
      // Wrap selection manually instead
      const range = selection.getRangeAt(0)
      const pre = document.createElement('pre')
      const code = document.createElement('code')
      try {
        const fragment = range.extractContents()
        code.appendChild(fragment)
        pre.appendChild(code)
        range.insertNode(pre)
        // Move caret inside
        const newRange = document.createRange()
        newRange.selectNodeContents(code)
        newRange.collapse(false)
        selection.removeAllRanges()
        selection.addRange(newRange)
      } catch {
        document.execCommand('formatBlock', false, 'pre')
      }
    } else {
      document.execCommand('formatBlock', false, tag)
    }
  }

  syncFromEditor()
}

onMounted(() => {
  if (editorRef.value) {
    editorRef.value.innerHTML = props.modelValue
  }
})

watch(
  () => props.modelValue,
  (next) => {
    if (!editorRef.value) return
    if (document.activeElement !== editorRef.value) {
      editorRef.value.innerHTML = next
    }
  },
)
</script>

<template>
  <div class="relative overflow-hidden rounded-xl bg-surface-container-low p-1">
    <div
      class="flex items-center gap-4 rounded-t-xl border-b border-outline-variant/10 bg-surface-container-high/50 px-6 py-4"
    >
      <button
        type="button"
        class="material-symbols-outlined text-outline transition-colors hover:text-primary"
        @click="command('bold')"
      >
        format_bold
      </button>
      <button
        type="button"
        class="material-symbols-outlined text-outline transition-colors hover:text-primary"
        @click="command('italic')"
      >
        format_italic
      </button>
      <button
        type="button"
        class="material-symbols-outlined text-outline transition-colors hover:text-primary"
        @click="setBlock('blockquote')"
      >
        format_quote
      </button>
      <div class="mx-2 h-4 w-px bg-outline-variant/30" />
      <button
        type="button"
        class="material-symbols-outlined text-outline transition-colors hover:text-primary"
        @click="command('insertUnorderedList')"
      >
        format_list_bulleted
      </button>
      <button
        type="button"
        class="material-symbols-outlined text-outline transition-colors hover:text-primary"
        @click="addLink"
      >
        link
      </button>
      <div class="mx-2 h-4 w-px bg-outline-variant/30" />
      <button
        type="button"
        class="material-symbols-outlined text-outline transition-colors hover:text-primary"
        @click="setBlock('pre')"
      >
        code
      </button>
    </div>

    <div class="relative">
      <div
        ref="editorRef"
        contenteditable="true"
        role="textbox"
        aria-multiline="true"
        class="editor-container min-h-125 w-full resize-none bg-transparent p-10 font-body text-lg leading-[1.8] text-on-surface-variant outline-none"
        :data-placeholder="placeholder"
        @input="syncFromEditor"
      />
      <div class="pointer-events-none absolute right-8 top-8 hidden w-32 lg:block">
        <p class="font-body text-sm italic text-on-surface/40">
          Deep Ink: Focus on the rhythm of the words. Leave room for the silence.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
[contenteditable='true']:empty::before {
  content: attr(data-placeholder);
  color: rgb(61 74 67 / 0.7);
}

/* Real-time visual feedback for block elements inside the editor */
.editor-container :deep(blockquote) {
  border-left: 3px solid currentColor;
  opacity: 0.7;
  margin: 0.75em 0;
  padding: 0.25em 1em;
  font-style: italic;
}

.editor-container :deep(pre) {
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace;
  font-size: 0.875em;
  line-height: 1.6;
  background: rgb(0 0 0 / 0.06);
  border-radius: 6px;
  padding: 0.75em 1em;
  margin: 0.75em 0;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

.editor-container :deep(pre code) {
  background: none;
  padding: 0;
  font-size: inherit;
}

.editor-container :deep(ul) {
  list-style-type: disc;
  padding-left: 1.5em;
  margin: 0.5em 0;
}

.editor-container :deep(ol) {
  list-style-type: decimal;
  padding-left: 1.5em;
  margin: 0.5em 0;
}

.editor-container :deep(li) {
  margin: 0.25em 0;
}

.editor-container :deep(a) {
  text-decoration: underline;
  opacity: 0.8;
}

.editor-container :deep(b),
.editor-container :deep(strong) {
  font-weight: 700;
}

.editor-container :deep(i),
.editor-container :deep(em) {
  font-style: italic;
}
</style>