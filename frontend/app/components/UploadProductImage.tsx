import { AlertCircleIcon, ImageUpIcon, XIcon } from 'lucide-react';

import { useFileUpload, type FileMetadata } from '../hooks/use-file-upload';
import { useEffect } from 'react';

type UploadProductImageProps = {
  setImage: React.Dispatch<
    React.SetStateAction<File | FileMetadata | undefined>
  >;
};

const UploadProductImage = ({ setImage }: UploadProductImageProps) => {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; // 5MB

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: 'image/*',
    maxSize,
  });

  const previewUrl = files[0]?.preview || null;

  useEffect(() => {
    if (files) {
      setImage(files[0]?.file);
    } else {
      setImage(undefined);
    }
  }, [files]);

  return (
    <div className='flex flex-col gap-2'>
      <div className='relative'>
        {/* Drop area */}
        <div
          role='button'
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className='relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-black p-4 transition-colors hover:bg-accent/50 has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50 cursor-pointer '
        >
          <input
            {...getInputProps()}
            className='sr-only'
            aria-label='Upload file'
          />
          {previewUrl ? (
            <div className='w-full'>
              <img
                src={previewUrl}
                alt={files[0]?.file?.name || 'Uploaded image'}
                className=' w-full max-w-md object-cover mx-auto'
              />
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center px-4 py-3 text-center'>
              <div
                className='mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border border-black'
                aria-hidden='true'
              >
                <ImageUpIcon className='size-4 opacity-90' />
              </div>
              <p className='mb-1.5 text-sm font-medium'>
                Drop your image here or click to browse
              </p>
              <p className='text-xs text-muted-foreground'>
                Max size: {maxSizeMB}MB
              </p>
            </div>
          )}
        </div>
        {previewUrl && (
          <div className='absolute top-4 right-4'>
            <button
              type='button'
              className='z-50 flex size-6 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white  outline-none hover:bg-black/80 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 transition duration-300'
              onClick={() => removeFile(files[0]?.id)}
              aria-label='Remove image'
            >
              <XIcon className='size-4' aria-hidden='true' />
            </button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className='flex items-center gap-1 text-xs text-destructive'
          role='alert'
        >
          <AlertCircleIcon className='size-3 shrink-0' />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
};
export default UploadProductImage;
