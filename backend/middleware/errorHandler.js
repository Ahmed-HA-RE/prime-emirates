const errorHandler = async (err, req, res, next) => {
  console.error(err);

  let status = err.status || 500;
  let message = err.message;

  // Mongoose invalid ObjectId
  if (err.name === 'CastError') {
    status = 400;
    message = 'Resource was not found';
  }

  res.status(status).json({ success: false, message });
};

export default errorHandler;
