import { FormSection as FormSectionType } from '../../types/form'
import { FormField } from './FormField'

interface FormSectionProps {
  section: FormSectionType
  values: Record<string, string>
  onChange: (fieldName: string, value: string) => void
  errors?: Record<string, string>
}

export const FormSection: React.FC<FormSectionProps> = ({
  section,
  values,
  onChange,
  errors = {},
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{section.label}</h3>
      <div className="space-y-4">
        {section.fields.map((field) => (
          <FormField
            key={field.fieldName}
            {...field}
            value={values[field.fieldName] || ''}
            onChange={(value) => onChange(field.fieldName, value)}
            error={errors[field.fieldName]}
          />
        ))}
      </div>
    </div>
  )
} 