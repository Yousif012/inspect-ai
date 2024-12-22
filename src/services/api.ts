import { supabase } from '../lib/supabase'
import { Inspection, NewInspection } from '../types'

export const api = {
  async getInspections(): Promise<Inspection[]> {
    const { data, error } = await supabase
      .from('inspections')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async getInspection(id: string): Promise<Inspection> {
    const { data, error } = await supabase
      .from('inspections')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async createInspection(inspection: NewInspection): Promise<Inspection> {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('inspections')
      .insert([{ ...inspection, user_id: user.id }])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async uploadImage(file: File, inspectionId: string): Promise<string> {
    const fileExt = file.name.split('.').pop()
    const fileName = `${inspectionId}/${Math.random()}.${fileExt}`
    const filePath = `inspections/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('inspection-images')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('inspection-images')
      .getPublicUrl(filePath)

    return publicUrl
  }
} 