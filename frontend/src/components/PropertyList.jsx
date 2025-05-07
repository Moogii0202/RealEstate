import React, { useEffect, useState } from 'react';
import API from '../api.js';
import { useNavigate } from 'react-router-dom';
import PropertyCard from './PropertyCard';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    API.get('/properties')
      .then((res) => {
        setProperties(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let results = properties;

    if (search) {
      results = results.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (location) {
      results = results.filter(p =>
        p.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (maxPrice) {
      results = results.filter(p => p.price <= Number(maxPrice));
    }

    setFiltered(results);
  }, [search, location, maxPrice, properties]);
const handleClick = () => {
  navigate('/properties/add')
}
  return (
    <div>
      <div className='bg-green-500  rounded-lg mb-5 w-full'>

      <div className='bg-gray-100 p-5 rounded-lg mx-1 w-auto flex flex-row justify-between items-center'>     
      <h2 className='font-bold text-green-800'>Property List</h2>
      <p className='text-gray-600'>Hi! can you add properties</p>
      <button onClick={handleClick} className='px-4 py-2 bg-green-700 rounded-md text-white hover:scale-95 hover:bg-green-600' >add Property</button>
      </div>
     
      </div>

      {/* Хайлт ба шүүлтүүр */}
      <div className='flex gap-5 mb-4'>
        <input
          type="text"
          placeholder="Гарчиг"
          value={search}
          className='px-5 py-2 rounded-lg w-1/4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 '
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Байршил"
          value={location}
          className='px-5 py-2 rounded-lg w-1/4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 '
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Хамгийн их үнэ"
          value={maxPrice}
          className='px-5 py-2 rounded-lg w-1/4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 '
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <div className='rounded-lg shadow-md p-5 bg-gray-100'>
        {/* Үл хөдлөх хөрөнгүүд */}

      {filtered.map((property) => (
        <PropertyCard key={property._id} property={property} />
      ))}
      </div>
      
    </div>
  );
};

export default PropertyList;