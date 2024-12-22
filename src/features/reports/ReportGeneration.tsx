import { useParams } from 'react-router-dom'

const ReportGeneration = () => {
  const { inspectionId } = useParams()

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Report Generation - Inspection #{inspectionId}
        </h1>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        {/* Report generation content */}
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-md">
            {/* Report options and controls */}
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportGeneration 