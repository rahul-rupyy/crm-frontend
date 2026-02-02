import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <Router>
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans'>
        <ThemeToggle />
        <Routes>
          <Route path='/' element={<Navigate to='/login' replace />} />
          <Route path='/leads' element={<div className='p-10'>Leads Page Coming Soon</div>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
