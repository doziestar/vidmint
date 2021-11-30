// handler to handle async middleware
// function asyncHandler(handler) {
//   return function (req, res, next) {
//     Promise.resolve(handler(req, res, next)).catch(next);
//   };
// }

module.exports = function asyncHandler(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
