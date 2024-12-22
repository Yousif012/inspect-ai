export interface Inspection {
  id: string
  created_at: string
  user_id: string
  client_name: string
  inspection_date: string
  address: string
  inspector_license: string
  sponsor_name?: string
  sponsor_license?: string
  status: 'pending' | 'in-progress' | 'completed'
  form_data: Record<string, any>
  images?: string[]
}

export interface InspectionSection {
  id: string
  inspection_id: string
  section_name: string
  field_name: string
  status: 'I' | 'NI' | 'NP' | 'D'
  notes?: string
  created_at: string
  updated_at: string
}