import { createHmac, timingSafeEqual } from 'node:crypto'

const encode = (value: string) => Buffer.from(value).toString('base64url')
const decode = (value: string) => Buffer.from(value, 'base64url').toString('utf8')

export const createAdminSessionToken = (username: string, secret: string, ttlSeconds = 60 * 60 * 8) => {
  const payload = JSON.stringify({ u: username, exp: Date.now() + ttlSeconds * 1000 })
  const encodedPayload = encode(payload)
  const signature = createHmac('sha256', secret).update(encodedPayload).digest('base64url')
  return `${encodedPayload}.${signature}`
}

export const verifyAdminSessionToken = (token: string | undefined, secret: string) => {
  if (!token) {
    return { valid: false as const }
  }

  const [encodedPayload, signature] = token.split('.')
  if (!encodedPayload || !signature) {
    return { valid: false as const }
  }

  const expected = createHmac('sha256', secret).update(encodedPayload).digest('base64url')
  const sigBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expected)

  if (sigBuffer.length !== expectedBuffer.length || !timingSafeEqual(sigBuffer, expectedBuffer)) {
    return { valid: false as const }
  }

  try {
    const payload = JSON.parse(decode(encodedPayload)) as { u: string; exp: number }
    if (Date.now() > payload.exp) {
      return { valid: false as const }
    }
    return { valid: true as const, username: payload.u }
  } catch {
    return { valid: false as const }
  }
}