import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <Routes>
          <Route path="/" element={<Navigate to="/leads" replace />} />
          <Route path="/leads" element={<div className="p-10">Leads Page Coming Soon</div>} />
          <Route path="/login" element={<div className="p-10">Login Page Coming Soon</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;