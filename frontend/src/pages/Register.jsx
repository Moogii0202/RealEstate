import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      alert('Амжилттай бүртгэгдлээ!');
      navigate('/login'); // Home руу буцна
    } catch (err) {
      alert('Алдаа гарлаа: ' + err.response.data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Бүртгүүлэх</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Нэр" onChange={handleChange} required className="w-full border p-2" />
        <input type="email" name="email" placeholder="Имэйл" onChange={handleChange} required className="w-full border p-2" />
        <input type="password" name="password" placeholder="Нууц үг" onChange={handleChange} required className="w-full border p-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Бүртгүүлэх</button>
      </form>
    </div>
  );
};

export default Register;
