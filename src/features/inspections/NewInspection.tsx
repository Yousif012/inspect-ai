import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react'
import { useForm } from '@mantine/form'
import { api } from '../../services/api'

export default function NewInspection() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const form = useForm({
    initialValues: {
      address: '',
      clientName: '',
      date: new Date().toISOString().split('T')[0],
    },
    validate: {
      address: (value) => (!value ? 'Address is required' : null),
      clientName: (value) => (!value ? 'Client name is required' : null),
    },
  })

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true)
    try {
      const inspection = await api.createInspection(values)
      navigate(`/inspections/${inspection.id}`)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow px-4 py-5 sm:p-6">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">New Inspection</h1>
      <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Property Address</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter the property address"
            {...form.getInputProps('address')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Client Name</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter client name"
            {...form.getInputProps('clientName')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Inspection Date</label>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            {...form.getInputProps('date')}
          />
        </div>

        <div className="border-2 border-dashed border-gray-300 p-4 rounded">
          <div className="flex justify-center items-center space-x-4">
            <IconUpload size={50} stroke={1.5} />
            <div>
              <p className="text-xl">Drag images here or click to select files</p>
              <p className="text-sm text-gray-500">Attach as many files as you need, each file should not exceed 5mb</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            Create Inspection
          </button>
        </div>
      </form>
    </div>
  )
} 