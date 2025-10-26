import { useNavigate, useSearchParams } from 'react-router';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui/pagination';
import { cn } from '~/lib/utils';

const PaginationResource = ({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  let [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page'));

  const handleNext = () => {
    setSearchParams({ page: page < totalPages ? `${page + 1}` : `${page}` });
  };
  const handlePrev = () => {
    setSearchParams({ page: page > 1 ? `${page - 1}` : `${1}` });
  };

  const handleClick = (page: number) => {
    setSearchParams({ page: `${page}` });
  };

  return (
    <Pagination className='mt-10 justify-start'>
      <PaginationContent className='space-x-4'>
        <PaginationItem>
          <PaginationPrevious
            to={`/?page=${currentPage}`}
            className='rounded-full'
            onClick={handlePrev}
          />
        </PaginationItem>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              to={`/?page=${page}`}
              isActive={page === currentPage}
              className={cn(
                'rounded-full',
                page === currentPage
                  ? 'border-black hover:bg-0'
                  : ' border border-gray-100'
              )}
              onClick={() => handleClick(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            to={`/?page=${currentPage}`}
            className='rounded-full'
            onClick={handleNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationResource;
