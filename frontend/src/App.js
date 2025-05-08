import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import AddProperty from './pages/AddProperty.jsx';
import PropertyPages from './pages/propertyPages.jsx';
import PropertyDetails from './pages/pDetail.jsx';
function App() {
  return (
    <Router>
       
      <Routes>
      <Route index="/register" element={<Register />} />
      <Route path="/login" element={<Login />} /> 
         <Route path="/properties/add" element={<AddProperty/>}/>
        <Route path="/properties" element={<PropertyPages />} />
        <Route path="/properties/:id" element={<PropertyDetails/>} />
      </Routes>
    </Router>
  );
}
export default App;