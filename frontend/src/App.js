import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import PropertyList from './components/PropertyList.jsx';
import PropertyForm from './components/PropertyForm.js';
import SideBars from './sidebar/Sidebar.jsx';
import PropertyPages from './pages/propertyPages.jsx';
import PropertyDetails from './pages/pDetail.jsx';
function App() {
  return (
    <Router>
        <SideBars/>
      <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} /> 
        <Route path="/" element={<PropertyPages />} />
        <Route path="/properties/:id" element={<PropertyDetails/>} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/properties/add" element={<PropertyForm />} />
      </Routes>
    </Router>
  );
}
export default App;