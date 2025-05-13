import React from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from '../utils/ratingsIcon';
import { FaMapMarkerAlt,FaEdit, FaTrash, FaPlus  } from 'react-icons/fa';
const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

    // Truncate long descriptions
    const truncateText = (text, wordLimit) => {
      return text.split(" ").slice(0, wordLimit).join(" ") + (text.split(" ").length > wordLimit ? "..." : "");
    };
  
  return (
    <div onClick={() => navigate(`/properties/${property._id}`)} 
    className='mb-4 cursor-auto p-2 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out  bg-white rounded-lg '
   >
    <div className='grid grid-cols-4 gap-2  items-stretch p-2 max-md:grid-cols-3 max-md:gap-1'>
{/* image */}
    <div className='w-[300px] h-[200px] rounded-lg overflow-hidden max-md:w-[250px] max-md:h-[150px]'>
    {property.image && <img src={property.image} alt={property.title}  />}
    </div>
       {/* title */}
      
    <div className='flex flex-col justify-between  w-full mx-4 '>
    <h2 className='text-green-700 font-bold text-lg '>Үл хөдлөх хөрөнгө</h2>
      <h3 className='font-bold '>{property.title}</h3>
      <section className='flex flex-row items-center gap-2'>
      <FaMapMarkerAlt className="text-red-500" />
      <p className='text-gray-400 text-sm'>{property.location}</p>
      </section>
      <p className='font-bold text-lg text-green-700'>{property.price.toLocaleString()}₮</p>
      <StarRating rating={4.5} />

    </div>
    {/* description */}
    <div className='w-auto max-md:hidden'>
      <h3 className='font-bold text-lg text-green-600 '>Дэлгэрэнгүй</h3>
      <div className='flex justify-center items-center h-full'>
    <p className='text-gray-500 text-sm '>{truncateText(property.description, 10)}</p>
      </div>
      <p></p>
    </div>
    {/* delete update icons */}
    <div className='w-auto items-center'>
      <h3 className='font-bold text-lg text-green-600 text-center'>Action</h3>
    <div className="flex gap-4 text-xl text-gray-600 justify-center items-center h-full">
    <button title="Edit">
      <FaEdit className="hover:text-blue-500" />
    </button>
    <button title="Delete" >
      <FaTrash className="hover:text-red-500" />
    </button>
    <button title="Add">
      <FaPlus className="hover:text-green-500" />
    </button>
  </div>
    </div>
    </div>
 
     
    </div>
  );
};

export default PropertyCard;