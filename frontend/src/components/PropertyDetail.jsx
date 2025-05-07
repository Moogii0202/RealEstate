import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api.js';
import { MdMap } from 'react-icons/md';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import StarRating from '../utils/ratingsIcon';
const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get(`/properties/${id}`).then((res) => setProperty(res.data));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Устгах уу?')) {
      API.delete(`/properties/${id}`).then(() => navigate('/'));
    }
  };

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    API.put(`/properties/${id}`, property).then(() => {
      alert('Шинэчлэгдлээ');
      setEditMode(false);
    });
  };

  if (!property) return <p>Уншиж байна...</p>;
 const validateAndSubmit = () => {
    if (!property.title.trim()) return setError('Гарчиг хоосон байж болохгүй');
    if (!property.description.trim()) return setError('Тодорхойлолт хоосон байна');
    if (!property.location.trim()) return setError('Байршил хоосон байна');
    if (!property.image.trim()) return setError('Зургийн линк хоосон байна');
    if (!property.price || isNaN(property.price) || Number(property.price) <= 0) {
      return setError('Үнэ эерэг тоо байх ёстой');
    }

    setError('');
    handleUpdate(); // зөв бол submit хийнэ
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
        <div className="w-full mx-auto bg-white p-6 rounded-xl shadow-md space-y-4 grid grid-cols-2 gap-4">
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
  
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Байршил</label>
          <input
            name="location"
            value={property.location}
            onChange={handleChange}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
  
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Зураг</label>
          <input
            name="image"
            value={property.image}
            onChange={handleChange}
            className="mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
        <div className='flex flex-row  justify-between  bg-white shadow-md rounded-lg p-5 items-stretch'>
          <div className='w-[600px] h-auto shadow-md rounded-lg overflow-hidden'> 
          <img src={property.image}  alt={property.title} className='w-full h-full object-cover rounded-lg' />
          </div>
        <div className=' bg-white shadow-md rounded-lg p-5 flex flex-col justify-between  w-2/5'>
        {/* Title location */}

        <div className='flex flex-row justify-between '>
      <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
      <div className='flex fllex-row gap-2'>
      <MdMap size={30} color="green" />
      <p className="text-gray-600">{property.location}</p>
      </div>
    </div>
    <div className="mt-4 ">
      <p className="text-lg font-bold text-green-700">{property.price}₮</p>
      <StarRating rating={4.5} />
      <p className="text-gray-700 mt-2">{property.description}</p>
    </div>
        </div>
        </div>
 
          
        </>
      )}
      
    </div>
  );
};

export default PropertyDetail;