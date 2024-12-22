import { useState } from 'react'
import { FormField } from './FormField'
import { FormSection } from './FormSection'
import { InspectionFormData } from '../../types/form'
import formSchema from '../../data/formSchema.json'

export const InspectionForm: React.FC = () => {
  const [formData, setFormData] = useState<InspectionFormData>({
    clientName: '',
    inspectionDate: '',
    propertyAddress: '',
    inspectorName: '',
    inspectorLicense: '',
    sponsorName: '',
    sponsorLicense: '',
  })

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Property Inspection Report
      </h2>

      {/* Basic Information Fields */}
      {formSchema.formFields
        .filter((field) => field.fieldType !== 'section')
        .map((field) => (
          <FormField
            key={field.fieldName}
            {...field}
            value={formData[field.fieldName] || ''}
            onChange={(value) => handleFieldChange(field.fieldName, value)}
          />
        ))}

      {/* Inspection Sections */}
      {formSchema.formFields
        .find((field) => field.fieldType === 'section')
        ?.sections.map((section) => (
          <FormSection
            key={section.sectionName}
            section={section}
            values={formData}
            onChange={handleFieldChange}
          />
        ))}

      <div className="mt-8">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit Report
        </button>
      </div>
    </form>
  )
} 