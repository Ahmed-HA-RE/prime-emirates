const errorHandler = async (err, req, res, next) => {
  console.error(err);

  let status = err.status || 500;
  let message = err.message;

  // Mongoose invalid ObjectId
  if (err.name === 'CastError') {
    status = 400;
    message = 'Resource was not found';
  }

  // Jose signature verification failed
  if (err.code === 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED') {
    status = 401;
    message = 'Token is either invalid or has been tampered with';
  }
  // Jose token expired
  if (err.code === 'ERR_JWT_EXPIRED') {
    status = 401;
    message = 'Your session has expired. Please log in again to continue.';
  }

  // Multer LIMIT_UNEXPECTED_FILE
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    status = 401;
    message = 'You can upload 1 image only.';
  }

  // Multer LIMIT_FILE_SIZE
  if (err.code === 'LIMIT_FILE_SIZE') {
    status = 401;
    message = 'Image size must not exceed 10MB ';
  }

  res.status(status).json({ success: false, message });
};

export default errorHandler;
