import { BaseField } from '../../types/form'

interface FormFieldProps extends BaseField {
  value: string
  onChange: (value: string) => void
  error?: string
}

export const FormField: React.FC<FormFieldProps> = ({
  fieldType,
  label,
  value,
  onChange,
  required,
  error,
}) => {
  switch (fieldType) {
    case 'text':
      return <TextField {...{ label, value, onChange, required, error }} />
    case 'date':
      return <DateField {...{ label, value, onChange, required, error }} />
    case 'select':
      return <SelectField {...{ label, value, onChange, required, error }} />
    case 'textarea':
      return <TextAreaField {...{ label, value, onChange, required, error }} />
    default:
      return null
  }
}

interface FieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  error?: string
}

export const TextField: React.FC<FieldProps> = ({
  label,
  value,
  onChange,
  required,
  error,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
)

export const DateField: React.FC<FieldProps> = ({
  label,
  value,
  onChange,
  required,
  error,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
)

export const SelectField: React.FC<FieldProps> = ({
  label,
  value,
  onChange,
  required,
  error,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    >
      <option value="">Select...</option>
      <option value="I">Inspected</option>
      <option value="NI">Not Inspected</option>
      <option value="NP">Not Present</option>
      <option value="D">Deficient</option>
    </select>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
)

export const TextAreaField: React.FC<FieldProps> = ({
  label,
  value,
  onChange,
  required,
  error,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      rows={4}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
) 