import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import Layout from './components/Layout'
import Dashboard from './features/dashboard/Dashboard'
import NewInspection from './features/inspections/NewInspection'
import InspectionsList from './features/inspections/InspectionsList'
import ReportGeneration from './features/reports/ReportGeneration'

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inspections/new" element={<NewInspection />} />
            <Route path="/inspections" element={<InspectionsList />} />
            <Route path="/reports/:inspectionId" element={<ReportGeneration />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
