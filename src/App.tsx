import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ThemeToggle from './components/ThemeToggle';
import PrivateRoute from './components/PrivateRoute';
import LeadsList from './pages/LeadList';
import AddLead from './pages/AddLead';
import LeadDetails from './pages/LeadDetails';

function App() {
  return (
    <Router>
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans'>
        <ThemeToggle />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          <Route
            path='/leads'
            element={
              <PrivateRoute>
                <LeadsList />
              </PrivateRoute>
            }
          />

          <Route
            path='/leads/new'
            element={
              <PrivateRoute>
                <AddLead />
              </PrivateRoute>
            }
          />
          <Route
            path='/leads/:id'
            element={
              <PrivateRoute>
                <LeadDetails />
              </PrivateRoute>
            }
          />
          <Route path='/' element={<Navigate to='/leads' replace />} />

          <Route path='*' element={<Navigate to='/leads' replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
