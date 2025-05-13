import React, { useState } from 'react';
import API from '../api.js';

const initialForm = {
  title: '',
  description: '',
  price: '',
  location: '',
  district: '',
  khoroo: '',
  rooms: '',
  area: '',
  buildingFloor: '',
  unitFloor: '',
  builtYear: '',
  paymentType: '',
  elevator: '',
  phone: '',
  image: null,
};

const districts = ['Сүхбаатар', 'Баянгол', 'Баянзүрх', 'Чингэлтэй', 'Хан-Уул', 'Сонгинохайрхан'];
const builtYears = Array.from({ length: 50 }, (_, i) => 2025 - i);
const paymentTypes = ['Бэлнээр', 'Лизинг', 'Бартер'];
const elevatorOptions = ['Байгаа', 'Байхгүй'];
const roomOptions = Array.from({ length: 5 }, (_, i) => i + 1); // 1-10 хүртэлх өрөө
const khorooOptions = Array.from({ length: 20 }, (_, i) => i + 1); // 1-20 хүртэлх хороо (жишээ тоо)


const PropertyForm = () => {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === 'buildingFloor') {
      setForm({ ...form, buildingFloor: value, unitFloor: '' });
    }
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    // Validate phone number
    const phoneRegex = /^[89]\d{7}$/;
    if (!phoneRegex.test(form.phone)) {
      setMessage('📵 Утасны дугаар 8 оронтой бөгөөд 8 эсвэл 9-өөр эхлэх ёстой!');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await API.post('/properties', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage('✅ Амжилттай нэмэгдлээ!');
      setForm(initialForm);
    } catch (error) {
      console.error(error);
      setMessage('❌ Алдаа гарлаа. Дахин оролдоно уу.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className='bg-green-500 rounded-lg mb-5 w-full'>
        <div className='bg-gray-100 p-5 rounded-lg mx-1 w-auto flex flex-row justify-between items-center'>
          <h2 className='font-bold text-green-800'>Property Form</h2>
          <p className='text-gray-600'>Мэдээллээ оруулна уу</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
  <div className="grid grid-cols-3 gap-4">
    {/* Энгийн текст талбарууд */}
    {['title', 'description', 'price', 'area'].map((field) => (
      <div key={field} className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 capitalize">{field}</label>
        <input
          name={field}
          type={field === 'price' || field === 'area' ? 'number' : 'text'}
          value={form[field]}
          onChange={handleChange}
          required
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
    ))}
    
          {/* Байршил */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Хот</label>
            <select name="location" value={form.location} onChange={handleChange} required className="mt-1 px-3 py-2 border rounded-md">
              <option value="">Сонгох</option>
              <option value="Улаанбаатар">Улаанбаатар</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Дүүрэг</label>
            <select name="district" value={form.district} onChange={handleChange} required className="mt-1 px-3 py-2 border rounded-md">
              <option value="">Сонгох</option>
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Хороо</label>
            <select
  name="khoroo"
  value={form.khoroo}
  onChange={handleChange}
  required
  className="mt-1 px-3 py-2 border rounded-md"
>
  <option value="">Сонгох</option>
  {khorooOptions.map((num) => (
    <option key={num} value={num}>{num}-р хороо</option>
  ))}
</select>

          </div>

          {/* Барилгын давхар */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Барилгын давхар</label>
            <select name="buildingFloor" value={form.buildingFloor} onChange={handleChange} required className="mt-1 px-3 py-2 border rounded-md">
              <option value="">Сонгох</option>
              {Array.from({ length: 35 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          {/* Байрны давхар */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Хэдэн давхарт</label>
            <select
              name="unitFloor"
              value={form.unitFloor}
              onChange={handleChange}
              required
              disabled={!form.buildingFloor}
              className="mt-1 px-3 py-2 border rounded-md"
            >
              <option value="">Сонгох</option>
              {form.buildingFloor &&
                Array.from({ length: parseInt(form.buildingFloor) }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
            </select>
          </div>
          {/* Өрөөний тоо */}
          <div className="flex flex-col">
  <label className="text-sm font-medium text-gray-700">Өрөөний тоо</label>
  <select
    name="rooms"
    value={form.rooms}
    onChange={handleChange}
    required
    className="mt-1 px-3 py-2 border rounded-md"
  >
    <option value="">Сонгох</option>
    {roomOptions.map((num) => (
      <option key={num} value={num}>{num} өрөө</option>
    ))}
  </select>
</div>


          {/* Ашиглалтад орсон он */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Ашиглалтад орсон он</label>
            <select name="builtYear" value={form.builtYear} onChange={handleChange} required className="mt-1 px-3 py-2 border rounded-md">
              <option value="">Сонгох</option>
              {builtYears.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Төлбөрийн нөхцөл */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Төлбөрийн нөхцөл</label>
            <select name="paymentType" value={form.paymentType} onChange={handleChange} required className="mt-1 px-3 py-2 border rounded-md">
              <option value="">Сонгох</option>
              {paymentTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Цахилгаан шат */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Цахилгаан шат</label>
            <select name="elevator" value={form.elevator} onChange={handleChange} required className="mt-1 px-3 py-2 border rounded-md">
              <option value="">Сонгох</option>
              {elevatorOptions.map((el) => (
                <option key={el} value={el}>{el}</option>
              ))}
            </select>
          </div>

          {/* Утас */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Утасны дугаар</label>
            <input
              name="phone"
              type="text"
              value={form.phone}
              onChange={handleChange}
              required
              maxLength={8}
              className="mt-1 px-3 py-2 border rounded-md"
            />
          </div>

          {/* Зураг оруулах */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Зураг</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              className="mt-1"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 bg-green-700 hover:bg-green-500 text-white px-6 py-2 rounded-md disabled:opacity-50"
        >
          {loading ? 'Нэмж байна...' : 'Нэмэх'}
        </button>

        {message && <p className="mt-4 text-sm text-green-700">{message}</p>}
      </form>
    </div>
  );
};

export default PropertyForm;
