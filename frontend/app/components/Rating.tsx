import { FaRegStar, FaStar } from 'react-icons/fa6';
import { FaStarHalfAlt } from 'react-icons/fa';

const Rating = ({ value, text }: { value: number; text: number }) => {
  return (
    <div className='flex flex-row items-center gap-3'>
      {/* Stars */}
      <div className='flex flex-row items-center gap-1.5'>
        {value < 0.5 ? (
          <FaRegStar size={16} className='text-yellow-300' />
        ) : value < 1 ? (
          <FaStarHalfAlt size={16} className='text-yellow-300' />
        ) : (
          <FaStar size={16} className='text-yellow-300' />
        )}
        {value < 1.5 ? (
          <FaRegStar size={16} className='text-yellow-300' />
        ) : value < 2 ? (
          <FaStarHalfAlt size={16} className='text-yellow-300' />
        ) : (
          <FaStar size={16} className='text-yellow-300' />
        )}
        {value < 2.5 ? (
          <FaRegStar size={16} className='text-yellow-300' />
        ) : value < 3 ? (
          <FaStarHalfAlt size={16} className='text-yellow-300' />
        ) : (
          <FaStar size={16} className='text-yellow-300' />
        )}
        {value < 3.5 ? (
          <FaRegStar size={16} className='text-yellow-300' />
        ) : value < 4 ? (
          <FaStarHalfAlt size={16} className='text-yellow-300' />
        ) : (
          <FaStar size={16} className='text-yellow-300' />
        )}
        {value < 4.5 ? (
          <FaRegStar size={16} className='text-yellow-300' />
        ) : value < 5 ? (
          <FaStarHalfAlt size={16} className='text-yellow-300' />
        ) : (
          <FaStar size={16} className='text-yellow-300' />
        )}
      </div>
      {/* Reviews */}
      <h2 className='text-white'>{text} reviews</h2>
    </div>
  );
};

export default Rating;
