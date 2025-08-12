import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gnzocasyggbbtcnullyz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imduem9jYXN5Z2diYnRjbnVsbHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MTM5ODEsImV4cCI6MjA3MDQ4OTk4MX0.AZBCZJF8pp9Wnsfj01fb6GQyaIbktr8BdPWUXvt9wDo'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type MediaFile = {
  id: string
  name: string
  file_path: string
  file_type: 'image' | 'video'
  uploaded_by: string
  uploaded_at: string
  file_size: number
}