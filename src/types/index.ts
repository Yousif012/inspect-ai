export interface Inspection {
  id: string
  created_at: string
  address: string
  client_name: string
  inspection_date: string
  status: 'pending' | 'in-progress' | 'completed'
  images?: string[]
}

export type NewInspection = Omit<Inspection, 'id' | 'created_at'> 