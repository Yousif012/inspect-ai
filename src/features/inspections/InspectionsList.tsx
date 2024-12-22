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
      console.error('Error loading inspections:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-4">Loading...</div>
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
          {inspections.map((inspection) => (
            <li key={inspection.id} className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">{inspection.address}</h2>
                  <p className="text-sm text-gray-500">Client: {inspection.client_name}</p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(inspection.inspection_date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    inspection.status === 'completed' ? 'bg-green-100 text-green-800' :
                    inspection.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {inspection.status}
                  </span>
                  <Link
                    to={`/reports/${inspection.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Report
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
} 