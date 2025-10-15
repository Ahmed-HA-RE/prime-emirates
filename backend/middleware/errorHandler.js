const errorHandler = async (err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;

  // Mongoose invalid ObjectId
  if (err.name === 'CastError') {
    return res
      .status(400)
      .json({ success: false, message: 'Resource was not found' });
  }

  res.status(status).json({ success: false, error: err.message });
};

export default errorHandler;
