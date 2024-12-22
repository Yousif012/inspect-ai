import { supabase } from '../lib/supabase'
import { Inspection, InspectionFormData } from '../types'

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

  async createInspection(inspection: InspectionFormData): Promise<Inspection> {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) throw new Error('User not authenticated')

    const { data, error } = await supabase
      .from('inspections')
      .insert([{
        user_id: user.id,
        client_name: inspection.clientName,
        inspection_date: inspection.inspectionDate,
        address: inspection.propertyAddress,
        inspector_license: inspection.inspectorLicense,
        sponsor_name: inspection.sponsorName,
        sponsor_license: inspection.sponsorLicense,
        form_data: inspection.form_data || {},
        status: 'pending'
      }])
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
  },

  async updateInspectionSection(
    inspectionId: string,
    sectionName: string,
    fieldName: string,
    status: 'I' | 'NI' | 'NP' | 'D',
    notes?: string
  ) {
    const { error } = await supabase
      .from('inspection_sections')
      .upsert({
        inspection_id: inspectionId,
        section_name: sectionName,
        field_name: fieldName,
        status,
        notes,
        updated_at: new Date().toISOString()
      })

    if (error) throw error
  }
} 