import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { FormField } from '../../components/form/FormField'
import { FormSection } from '../../components/form/FormSection'
import { InspectionFormData } from '../../types/form'
import { api } from '../../services/api'

// Import the form schema
const formSchema = {
  formFields: [
    {
      fieldName: "clientName",
      fieldType: "text",
      label: "Name of Client",
      required: true
    },
    {
      fieldName: "inspectionDate",
      fieldType: "date",
      label: "Date of Inspection",
      required: true
    },
    {
      fieldName: "propertyAddress",
      fieldType: "text",
      label: "Address of Inspected Property",
      required: true
    },
    {
      fieldName: "inspectorLicense",
      fieldType: "text",
      label: "TREC License #",
      required: true
    },
    {
      fieldName: "sponsorName",
      fieldType: "text",
      label: "Name of Sponsor (if applicable)",
      required: false
    },
    {
      fieldName: "sponsorLicense",
      fieldType: "text",
      label: "TREC License # (Sponsor)",
      required: false
    },
    {
      fieldName: "inspectionSections",
      fieldType: "section",
      sections: [
        {
          sectionName: "structuralSystems",
          label: "I. STRUCTURAL SYSTEMS",
          fields: [
            { fieldName: "foundations", fieldType: "select", label: "A. Foundations" },
            { fieldName: "gradingAndDrainage", fieldType: "select", label: "B. Grading and Drainage" },
            { fieldName: "roofCoveringMaterials", fieldType: "select", label: "C. Roof Covering Materials" },
            { fieldName: "roofStructures", fieldType: "select", label: "D. Roof Structures and Attics" },
            { fieldName: "walls", fieldType: "select", label: "E. Walls (Interior and Exterior)" },
            { fieldName: "ceilingsAndFloors", fieldType: "select", label: "F. Ceilings and Floors" },
            { fieldName: "doors", fieldType: "select", label: "G. Doors (Interior and Exterior)" },
            { fieldName: "windows", fieldType: "select", label: "H. Windows" },
            { fieldName: "stairways", fieldType: "select", label: "I. Stairways (Interior and Exterior)" },
            { fieldName: "fireplacesAndChimneys", fieldType: "select", label: "J. Fireplaces and Chimneys" },
            { fieldName: "porches", fieldType: "select", label: "K. Porches, Balconies, Decks, and Carports" },
            { fieldName: "otherStructuralSystems", fieldType: "select", label: "L. Other" }
          ]
        },
        {
          sectionName: "electricalSystems",
          label: "II. ELECTRICAL SYSTEMS",
          fields: [
            { fieldName: "serviceEntrance", fieldType: "select", label: "A. Service Entrance and Panels" },
            { fieldName: "branchCircuits", fieldType: "select", label: "B. Branch Circuits, Connected Devices, and Fixtures" },
            { fieldName: "otherElectrical", fieldType: "select", label: "C. Other" }
          ]
        },
        {
          sectionName: "hvacSystems",
          label: "III. HEATING, VENTILATION AND AIR CONDITIONING SYSTEMS",
          fields: [
            { fieldName: "heatingEquipment", fieldType: "select", label: "A. Heating Equipment" },
            { fieldName: "coolingEquipment", fieldType: "select", label: "B. Cooling Equipment" },
            { fieldName: "ductSystems", fieldType: "select", label: "C. Duct Systems, Chases, and Vents" },
            { fieldName: "otherHVAC", fieldType: "select", label: "D. Other" }
          ]
        },
        {
          sectionName: "plumbingSystems",
          label: "IV. PLUMBING SYSTEMS",
          fields: [
            { fieldName: "supplySystems", fieldType: "select", label: "A. Plumbing Supply, Distribution Systems and Fixtures" },
            { fieldName: "drainsWastes", fieldType: "select", label: "B. Drains, Wastes, and Vents" },
            { fieldName: "waterHeatingEquipment", fieldType: "select", label: "C. Water Heating Equipment" },
            { fieldName: "hydroMassageEquipment", fieldType: "select", label: "D. Hydro-Massage Therapy Equipment" },
            { fieldName: "gasDistribution", fieldType: "select", label: "E. Gas Distribution Systems and Gas Appliances" },
            { fieldName: "otherPlumbing", fieldType: "select", label: "F. Other" }
          ]
        },
        {
          sectionName: "appliances",
          label: "V. APPLIANCES",
          fields: [
            { fieldName: "dishwashers", fieldType: "select", label: "A. Dishwashers" },
            { fieldName: "foodWasteDisposers", fieldType: "select", label: "B. Food Waste Disposers" },
            { fieldName: "rangeHood", fieldType: "select", label: "C. Range Hood and Exhaust Systems" },
            { fieldName: "ranges", fieldType: "select", label: "D. Ranges, Cooktops, and Ovens" },
            { fieldName: "microwaveOvens", fieldType: "select", label: "E. Microwave Ovens" },
            { fieldName: "mechanicalExhaustVents", fieldType: "select", label: "F. Mechanical Exhaust Vents and Bathroom Heaters" },
            { fieldName: "garageDoorOperators", fieldType: "select", label: "G. Garage Door Operators" },
            { fieldName: "dryerExhaustSystems", fieldType: "select", label: "H. Dryer Exhaust Systems" },
            { fieldName: "otherAppliances", fieldType: "select", label: "I. Other" }
          ]
        },
        {
          sectionName: "optionalSystems",
          label: "VI. OPTIONAL SYSTEMS",
          fields: [
            { fieldName: "landscapeIrrigation", fieldType: "select", label: "A. Landscape Irrigation (Sprinkler) Systems" },
            { fieldName: "swimmingPools", fieldType: "select", label: "B. Swimming Pools, Spas, Hot Tubs, and Equipment" },
            { fieldName: "outbuildings", fieldType: "select", label: "C. Outbuildings" },
            { fieldName: "privateWaterWells", fieldType: "select", label: "D. Private Water Wells" },
            { fieldName: "privateSewageDisposal", fieldType: "select", label: "E. Private Sewage Disposal Systems" },
            { fieldName: "otherBuiltInAppliances", fieldType: "select", label: "F. Other Built-in Appliances" },
            { fieldName: "otherOptionalSystems", fieldType: "select", label: "G. Other" }
          ]
        }
      ]
    }
  ]
} as const

export default function NewInspection() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<InspectionFormData>({
    clientName: '',
    inspectionDate: new Date().toISOString().split('T')[0],
    propertyAddress: '',
    inspectorName: user?.email || '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const inspection = await api.createInspection({
        ...formData,
        form_data: {}, // Initialize empty form data for sections
      })
      navigate(`/inspections/${inspection.id}`)
    } catch (err) {
      console.error('Error creating inspection:', err)
      setError('Failed to create inspection')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow px-4 py-5 sm:p-6">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">New Inspection</h1>
      
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Fields */}
        {formSchema.formFields
          .filter(field => field.fieldType !== 'section')
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
          .find(field => field.fieldType === 'section')
          ?.sections.map((section) => (
            <FormSection
              key={section.sectionName}
              section={section}
              values={formData}
              onChange={handleFieldChange}
            />
          ))}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Creating...' : 'Create Inspection'}
          </button>
        </div>
      </form>
    </div>
  )
} 