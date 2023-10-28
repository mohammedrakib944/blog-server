/**
 * @param {Response} res
 * @param {number} statusCode
 * @param {string} message
 * @returns
 */
const success = (res, statusCode = 200, message = "Success!") => {
  return res.status(statusCode).json({
    success: true,
    message,
  });
};
export default success;
