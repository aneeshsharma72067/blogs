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
  if (!url) {
    return
  }
  command('createLink', url)
}

const setBlock = (tag: 'blockquote' | 'pre' | 'p') => {
  command('formatBlock', tag)
}

onMounted(() => {
  if (editorRef.value) {
    editorRef.value.innerHTML = props.modelValue
  }
})

watch(
  () => props.modelValue,
  (next) => {
    if (!editorRef.value) {
      return
    }
    if (document.activeElement !== editorRef.value) {
      editorRef.value.innerHTML = next
    }
  },
)
</script>

<template>
  <div class="relative overflow-hidden rounded-xl bg-surface-container-low p-1">
    <div class="flex items-center gap-4 rounded-t-xl border-b border-outline-variant/10 bg-surface-container-high/50 px-6 py-4">
      <button type="button" class="material-symbols-outlined text-outline transition-colors hover:text-primary" @click="command('bold')">format_bold</button>
      <button type="button" class="material-symbols-outlined text-outline transition-colors hover:text-primary" @click="command('italic')">format_italic</button>
      <button type="button" class="material-symbols-outlined text-outline transition-colors hover:text-primary" @click="setBlock('blockquote')">format_quote</button>
      <div class="mx-2 h-4 w-px bg-outline-variant/30" />
      <button type="button" class="material-symbols-outlined text-outline transition-colors hover:text-primary" @click="command('insertUnorderedList')">format_list_bulleted</button>
      <button type="button" class="material-symbols-outlined text-outline transition-colors hover:text-primary" @click="addLink">link</button>
      <div class="mx-2 h-4 w-px bg-outline-variant/30" />
      <button type="button" class="material-symbols-outlined text-outline transition-colors hover:text-primary" @click="setBlock('pre')">code</button>
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
        <p class="font-body text-sm italic text-on-surface/40">Deep Ink: Focus on the rhythm of the words. Leave room for the silence.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
[contenteditable='true']:empty::before {
  content: attr(data-placeholder);
  color: rgb(61 74 67 / 0.7);
}
</style>