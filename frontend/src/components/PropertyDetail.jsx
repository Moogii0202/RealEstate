import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api.js';
import { MdMap } from 'react-icons/md';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import StarRating from '../utils/ratingsIcon';

const districts = ['Сүхбаатар', 'Баянгол', 'Баянзүрх', 'Чингэлтэй', 'Хан-Уул', 'Сонгинохайрхан'];
const builtYears = Array.from({ length: 50 }, (_, i) => 2025 - i);
const paymentTypes = ['Бэлнээр', 'Лизинг', 'Бартер'];
const elevatorOptions = ['Байгаа', 'Байхгүй'];
const roomOptions = Array.from({ length: 5 }, (_, i) => i + 1); // 1-10 хүртэлх өрөө
const khorooOptions = Array.from({ length: 20 }, (_, i) => i + 1); // 1-20 хүртэлх хороо (жишээ тоо)
const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // useEffect(() => {
  //   API.get(`/properties/${id}`).then((res) => setProperty(res.data));
  // }, [id]);

  useEffect(() => {
  API.get(`/properties/${id}`).then((res) => {
    const property = res.data;

    if (
      property.image &&
      property.image.data &&
      Array.isArray(property.image.data.data) &&
      property.image.contentType
    ) {
      const byteArray = new Uint8Array(property.image.data.data); // <- notice .data.data
      const base64String = btoa(
        byteArray.reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      property.image = `data:${property.image.contentType};base64,${base64String}`;
    }

    setProperty(property);
  });
}, [id]);


  const handleDelete = () => {
    if (window.confirm('Устгах уу?')) {
      API.delete(`/properties/${id}`).then(() => navigate('/'));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
    if (name === 'buildingFloor') {
      setProperty({ ...property, buildingFloor: value, unitFloor: '' });
    }
  };

    const handleFileChange = (e) => {
    setProperty({ ...property, image: e.target.files[0] });
  };

  // const handleUpdate =async (e) => {
  //   API.put(`/properties/${id}`, property).then(() => {
  //     alert('Шинэчлэгдлээ');
  //     setEditMode(false);
  //   });
  // };

  if (!property) return <p>Уншиж байна...</p>;
//  const validateAndSubmit =async (e) => {
//   e.preventDefault();
//   setError('');
//   setMessage('');
//   // Validate phone number
//     const phoneRegex = /^[89]\d{7}$/;
//     if (!phoneRegex.test(property.phone)) {
//       setMessage('📵 Утасны дугаар 8 оронтой бөгөөд 8 эсвэл 9-өөр эхлэх ёстой!');
//       return;
//     }
//     if (!property.title.trim()) return setError('Гарчиг хоосон байж болохгүй');
//     if (!property.description.trim()) return setError('Тодорхойлолт хоосон байна');
//     if (!property.location.trim()) return setError('Байршил хоосон байна');
//     if (typeof property.image === 'string' && !property.image.trim()) return setError('Зургийн линк хоосон байна');
//     if (!property.price || isNaN(property.price) || Number(property.price) <= 0) {
//       return setError('Үнэ эерэг тоо байх ёстой');
//     }
    
//     try {
//       const formData = new FormData();
//       Object.entries(property).forEach(([key, value]) => {
//         formData.append(key, value);
//       });
//       console.log('formData', formData);

//       await API.put(`/properties/${id}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       setMessage('✅ Амжилттай шинэчлэгдлээ!');
//       alert('Шинэчлэгдлээ');
//     setEditMode(false);
//     navigate(`/properties`);
//     } catch (error) {
//       console.error(error);
//       setMessage('❌ Алдаа гарлаа. Дахин оролдоно уу.');
//     } 
  

    
//   };
 
const validateAndSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setMessage('');

  const phoneRegex = /^[89]\d{7}$/;

  const requiredFields = [
    { key: 'title', label: 'Гарчиг' },
    { key: 'description', label: 'Тодорхойлолт' },
    { key: 'location', label: 'Байршил' },
    { key: 'district', label: 'Дүүрэг' },
    { key: 'khoroo', label: 'Хороо' },
    { key: 'buildingFloor', label: 'Барилгын давхар' },
    { key: 'unitFloor', label: 'Юнитийн давхар' },
    { key: 'rooms', label: 'Өрөөний тоо' },
    { key: 'builtYear', label: 'Ашиглалтад орсон он' },
    { key: 'paymentType', label: 'Төлбөрийн нөхцөл' },
    { key: 'elevator', label: 'Цахилгаан шат' },
    { key: 'area', label: 'Талбай' },
    { key: 'phone', label: 'Утасны дугаар' },
    { key: 'price', label: 'Үнэ' },
  ];

  for (let field of requiredFields) {
    if (
      !property[field.key] ||
      typeof property[field.key] === 'string' && property[field.key].trim() === ''
    ) {
      setError(`${field.label} хоосон байж болохгүй.`);
      return;
    }
  }

  if (!phoneRegex.test(property.phone)) {
    setError('📵 Утасны дугаар 8 оронтой бөгөөд 8 эсвэл 9-өөр эхлэх ёстой!');
    return;
  }

  if (isNaN(property.price) || Number(property.price) <= 0) {
    setError('Үнэ эерэг тоо байх ёстой.');
    return;
  }

  try {
    const formData = new FormData();
    Object.entries(property).forEach(([key, value]) => {
      formData.append(key, value);
    });

    await API.put(`/properties/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    setMessage('✅ Амжилттай шинэчлэгдлээ!');
    alert('Шинэчлэгдлээ');
    setEditMode(false);
    navigate(`/properties`);
  } catch (error) {
    console.error(error);
    setError('❌ Алдаа гарлаа. Дахин оролдоно уу.');
  }
};

return (
    <div>
      <div className='bg-green-800  rounded-xl mb-5  w-full'>

<div className='bg-green-100 py-7 rounded-lg mx-1 w-auto flex flex-row justify-between items-center'>   
  {editMode ? (<h2 className='ml-5 font-bold text-green-800 text-xl'> Үл хөдлөх хөрөнгө мэдээлэл засах</h2>) : (
    <h2 className='ml-5 font-bold text-green-800 text-xl'> Үл хөдлөх хөрөнгийн дэлгэрэнгүй</h2>
  )}  
{/* <h2 className='ml-5 font-bold text-green-800 text-xl'> Үл хөдлөх хөрөнгийн дэлгэрэнгүй</h2> */}
<div className='flex flex-row gap-2'>
{!editMode && (
  <button
    className='px-4 py-2 mx-5 bg-green-700 text-white text-bold rounded-md'
    onClick={() => setEditMode(true)}
  >
    Шинэчлэх
  </button>
)}
            <button onClick={handleDelete}  className='px-4 py-2 mx-2 bg-green-700 text-white text-bold rounded-md'  >Устгах</button>
          </div>

</div>

</div>
      {editMode ? (
        <div className="w-full mx-auto bg-white p-6 rounded-xl shadow-md space-y-4 grid grid-cols-3 gap-2">
        {error && (
          <div className="col-span-2 text-red-600 font-medium">{error}</div>
        )}
  
        <div className="flex flex-col mt-4">
          <label className="text-sm font-medium text-gray-700">Гарчиг</label>
          <input
            name="title"
            value={property.title}
            onChange={handleChange}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
  
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Тодорхойлолт</label>
          <input
            name="description"
            value={property.description}
            onChange={handleChange}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
  
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Үнэ</label>
          <input
            name="price"
            type="number"
            value={property.price}
            onChange={handleChange}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

            <div  className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 capitalize">Area</label>
        <input
          name="area"
          type="text"
          value={property.area}
          onChange={handleChange}
          required
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Байршил</label>
          <input
            name="location"
            value={property.location}
            onChange={handleChange}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
           {/* Hot */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Хот</label>
            <select name="location" value={property.location} onChange={handleChange} required className="mt-1 px-3 py-2 border rounded-md">
              <option value="">Сонгох</option>
              <option value="Улаанбаатар">Улаанбаатар</option>
            </select>
          </div>
        {/* Duureg */}
         <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Дүүрэг</label>
            <select name="district" value={property.district} onChange={handleChange} required className="mt-1 px-3 py-2 border rounded-md">
              <option value="">Сонгох</option>
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          {/* Horoo */}
                <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Хороо</label>
            <select
  name="khoroo"
  value={property.khoroo}
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
            <select name="buildingFloor" value={property.buildingFloor} onChange={handleChange} required className="mt-1 px-3 py-2 border rounded-md">
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
              value={property.unitFloor}
              onChange={handleChange}
              required
              disabled={!property.buildingFloor}
              className="mt-1 px-3 py-2 border rounded-md"
            >
              <option value="">Сонгох</option>
              {property.buildingFloor &&
                Array.from({ length: parseInt(property.buildingFloor) }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
            </select>
          </div>
            {/* Өрөөний тоо */}
          <div className="flex flex-col">
  <label className="text-sm font-medium text-gray-700">Өрөөний тоо</label>
  <select
    name="rooms"
    value={property.rooms}
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
            <select name="builtYear" value={property.builtYear} onChange={handleChange} required className="mt-1 px-3 py-2 border rounded-md">
              <option value="">Сонгох</option>
              {builtYears.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Төлбөрийн нөхцөл */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Төлбөрийн нөхцөл</label>
            <select name="paymentType" value={property.paymentType} onChange={handleChange} required className="mt-1 px-3 py-2 border rounded-md">
              <option value="">Сонгох</option>
              {paymentTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Цахилгаан шат */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Цахилгаан шат</label>
            <select name="elevator" value={property.elevator} onChange={handleChange} required className="mt-1 px-3 py-2 border rounded-md">
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
              value={property.phone}
              onChange={handleChange}
              required
              maxLength={8}
              className="mt-1 px-3 py-2 border rounded-md"
            />
          </div>
          {/* Zurag oruulh input */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Зураг</label>
          <input
            name="image"
            type='file'
           
            onChange={handleFileChange}
            accept="image/*"
            className="mt-1"
          
          />
        </div>
  
        <div className="flex flex-col">
          <button
            className="mt-5 px-4 py-2 mx-2 bg-green-700 text-white font-bold rounded-md"
            onClick={validateAndSubmit}
          >
            Хадгалах
          </button>
        </div>
      </div>
      ) : (
        <>

        <div className='bg-white shadow-md rounded-lg p-5 items-stretch'>
        <div className='flex flex-row  justify-between '>
          <div className='w-[600px] h-auto shadow-md rounded-lg overflow-hidden'> 
          <img src={property.image}  alt={property.title} className='w-full h-full object-cover rounded-lg' />
          </div>
        <div className=' bg-white shadow-md rounded-lg p-5 flex flex-col justify-between  w-2/5'>
        {/* Title location */}
        <div className='flex flex-row justify-between '>
      <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
      <div className='flex fllex-row '>
      <MdMap size={30} color="green" />

      <p className="text-gray-600">{property.location}/</p>
      
       <p className="text-gray-600">{property.district}/{property.khoroo}</p>
      </div>
    </div>
    <div className="mt-4 ">
      <p className="text-lg font-bold text-green-700">{property.price}₮</p>

      <StarRating rating={4.5} />
     
    </div>
    {/* room number m3 area */}
    <div className='grid grid-cols-2 gap-2'>
     <p className="text-gray-600">Төрөл: {property.rooms} өрөө</p>
      <p className="text-gray-600">М2: {property.area} м²</p>
      <p className="text-gray-600">Барилгын давхар: {property.buildingFloor} давхар</p>
      <p className="text-gray-600">Юнитийн давхар: {property.unitFloor} давхар</p>
      <p className="text-gray-600">Баригдсан он: {property.builtYear}</p>
 {/* phone */}
 <p className="text-gray-600">Утас: {property.phone}</p>
    </div>
        </div>
        </div>
        {/* description */}
        <h2 className='mt-4 font-bold text-lg'>Тайлбар</h2>
           <p className="text-gray-700 mt-2">{property.description}</p>
        </div>
 
          
        </>
      )}
      
    </div>
  );
};

export default PropertyDetail;