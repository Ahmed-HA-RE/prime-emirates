import type { Product } from 'type';
import { Card, CardContent } from './ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Link } from 'react-router';

const ProductsCarousel = ({
  topRatedProducts,
}: {
  topRatedProducts: Product[];
}) => {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      orientation='horizontal'
      className='w-full max-w-4xl mx-auto my-14 mt-7'
    >
      <CarouselContent className='w-full'>
        {topRatedProducts.map((product) => (
          <CarouselItem key={product._id} className=''>
            <div className=''>
              <Card className='border-2 border-gray-200 p-0 overflow-hidden shadow-none'>
                <CardContent className='flex items-center justify-center relative'>
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.image}
                      className='hover:scale-105 transition duration-200'
                    />
                  </Link>
                  <span className='absolute bottom-2 bg-black/60 text-white text-lg font-semibold px-4 py-2 rounded-full backdrop-blur-sm'>
                    {product.name}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className='hidden md:block'>
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};
export default ProductsCarousel;
