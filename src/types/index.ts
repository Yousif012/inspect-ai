export interface Inspection {
  id: string
  address: string
  date: string
  clientName: string
  status: 'pending' | 'in-progress' | 'completed'
  photos: Photo[]
  notes: Note[]
}

export interface Photo {
  id: string
  url: string
  category: string
  aiAnalysis?: AIAnalysis
}

export interface Note {
  id: string
  content: string
  category: string
  timestamp: string
}

export interface AIAnalysis {
  defects: string[]
  severity: 'low' | 'medium' | 'high'
  recommendations: string[]
} 