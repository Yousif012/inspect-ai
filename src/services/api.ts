import { Inspection } from '../types'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const mockInspections: Inspection[] = [
  {
    id: '1',
    address: '123 Main St',
    date: new Date().toISOString(),
    clientName: 'John Doe',
    status: 'completed',
    photos: [],
    notes: []
  }
]

export const api = {
  getInspections: async () => {
    await delay(1000)
    return mockInspections
  },

  createInspection: async (data: Partial<Inspection>) => {
    await delay(1000)
    const newInspection = {
      ...data,
      id: Math.random().toString(),
      status: 'pending',
      photos: [],
      notes: []
    } as Inspection
    mockInspections.push(newInspection)
    return newInspection
  },

  analyzePhoto: async (photoUrl: string) => {
    await delay(1500)
    return {
      defects: ['Possible water damage', 'Minor cracks'],
      severity: 'medium',
      recommendations: ['Further investigation needed', 'Monitor for changes']
    }
  }
} 