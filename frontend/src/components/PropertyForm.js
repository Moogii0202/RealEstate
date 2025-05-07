import React, { useState } from 'react';
import API from '../api.js';

const initialForm = { title: '', description: '', price: '', location: '', image: '' };

const PropertyForm = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await API.post('/properties', form);
      setMessage('✅ Амжилттай нэмэгдлээ!');
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      setMessage('❌ Алдаа гарлаа. Дахин оролдоно уу.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 pl-[16vw] max-md:pl-[21vw]">
       <div className='bg-green-500  rounded-lg mb-5 w-full'>

<div className='bg-gray-100 p-5 rounded-lg mx-1 w-auto flex flex-row justify-between items-center'>     
<h2 className='font-bold text-green-800'>Property List</h2>
<p className='text-gray-600'>Hi! can you add properties</p>

</div>

</div>

    <form
    onSubmit={handleSubmit}
    className=" w-full mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
  >
   
  <div className='grid grid-cols-3 gap-4'>
  {['title', 'description', 'location', 'image'].map((field) => (
      <div key={field} className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 capitalize">
          {field}
        </label>
        <input
          name={field}
          placeholder={field[0].toUpperCase() + field.slice(1)}
          value={form[field]}
          onChange={handleChange}
          required
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    ))}
  
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">Price</label>
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
        className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  
  
    <button
      type="submit"
      disabled={loading}
      className="mt-4 bg-green-700 hover:bg-green-400 text-white px-4 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Нэмж байна...' : 'Нэмэх'}
    </button>
  </div>
  
    {message && <p className="text-green-600 text-sm mt-2">{message}</p>}
  </form>
    </div>
  
  );
};

export default PropertyForm;