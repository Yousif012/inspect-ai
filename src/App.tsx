import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Layout from './components/Layout'
import Login from './features/auth/Login'
import SignUp from './features/auth/SignUp'
import Dashboard from './features/dashboard/Dashboard'
import NewInspection from './features/inspections/NewInspection'
import InspectionsList from './features/inspections/InspectionsList'
import ReportGeneration from './features/reports/ReportGeneration'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return <Layout>{children}</Layout>
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/inspections/new"
            element={
              <PrivateRoute>
                <NewInspection />
              </PrivateRoute>
            }
          />
          <Route
            path="/inspections"
            element={
              <PrivateRoute>
                <InspectionsList />
              </PrivateRoute>
            }
          />
          <Route
            path="/reports/:inspectionId"
            element={
              <PrivateRoute>
                <ReportGeneration />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
