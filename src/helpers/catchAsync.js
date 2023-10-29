/**
 * @param {fn} asyncFunction
 * @returns
 */
export default function catchAsync(asyncFunction) {
  return async function (req, res, next) {
    try {
      await asyncFunction(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
