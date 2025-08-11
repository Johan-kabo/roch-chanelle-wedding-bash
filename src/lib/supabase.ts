import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nvzdioyxepurmdihhhyl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52emRpb3l4ZXB1cm1kaWhoaHlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MDYzMzMsImV4cCI6MjA3MDQ4MjMzM30.Qj6N5Sr7tY_9fuuxShqbSITWB8DFZprXiAErOtwOT9E'

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