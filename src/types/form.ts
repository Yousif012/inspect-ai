export type InspectionStatus = 'I' | 'NI' | 'NP' | 'D'

export interface BaseField {
  fieldName: string
  fieldType: string
  label: string
  required?: boolean
}

export interface TextField extends BaseField {
  fieldType: 'text'
}

export interface DateField extends BaseField {
  fieldType: 'date'
}

export interface SelectField extends BaseField {
  fieldType: 'select'
}

export interface TextAreaField extends BaseField {
  fieldType: 'textarea'
}

export interface FormSection {
  sectionName: string
  label: string
  fields: (SelectField | TextAreaField)[]
}

export interface SectionField extends BaseField {
  fieldType: 'section'
  sections: FormSection[]
}

export type FormField = TextField | DateField | SelectField | TextAreaField | SectionField

export interface InspectionFormData {
  clientName: string
  inspectionDate: string
  propertyAddress: string
  inspectorName: string
  inspectorLicense: string
  sponsorName?: string
  sponsorLicense?: string
  [key: string]: any
} 