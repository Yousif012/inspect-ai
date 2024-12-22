import { IconHome, IconClipboard, IconAlertCircle } from '@tabler/icons-react'

export default function Dashboard() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-lg font-medium text-blue-900">Recent Inspections</h2>
          {/* Add content here */}
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-lg font-medium text-green-900">Reports Overview</h2>
          {/* Add content here */}
        </div>
      </div>
    </div>
  )
} 