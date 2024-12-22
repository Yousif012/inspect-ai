import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Inspection } from '../../types'
import { api } from '../../services/api'

export default function InspectionsList() {
  const [inspections, setInspections] = useState<Inspection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadInspections()
  }, [])

  const loadInspections = async () => {
    try {
      const data = await api.getInspections()
      setInspections(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: Inspection['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900">Inspections</h1>
        <Link 
          to="/inspections/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          New Inspection
        </Link>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {/* Add inspection items here */}
        </ul>
      </div>
    </div>
  )
} 