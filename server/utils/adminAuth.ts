import type { H3Event } from 'h3'

import { requireAuthenticatedUser } from './supabase'

export const requireAdminSession = (event: H3Event) => requireAuthenticatedUser(event)