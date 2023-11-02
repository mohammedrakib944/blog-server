import categoryServices from "./category.services.js";
import catchAsync from "../../helpers/catchAsync.js";
import success from "../../helpers/success.js";
import { StatusCodes } from "http-status-codes";

class CategoryController {
  // create category
  createCategory = catchAsync(async (req, res, next) => {
    await categoryServices.createCategory(req.body.name);
    success(res, StatusCodes.CREATED, "Category added success!");
  });

  // get all categories
  getCategories = catchAsync(async (req, res, next) => {
    const categories = await categoryServices.getCategories();
    res.status(StatusCodes.OK).json(categories);
  });

  // get category by id
  getCategoryById = catchAsync(async (req, res, next) => {
    const category = await categoryServices.getCategoryById(req.params.id);
    res.status(StatusCodes.OK).json(category);
  });

  // update category
  updateCategory = catchAsync(async (req, res, next) => {
    await categoryServices.updateCategory({
      id: req.params.id,
      name: req.body.name,
    });
    success(res, StatusCodes.OK, "Category updated success!");
  });

  // update status category
  updateStatus = catchAsync(async (req, res, next) => {
    await categoryServices.updateStatus(req.body);
    success(res, StatusCodes.OK, "Status updated success!");
  });

  // delete category
  deleteCategory = catchAsync(async (req, res, next) => {
    await categoryServices.deleteCategory(req.params.id);
    success(res, StatusCodes.OK, "Category deleted success!");
  });
}

export default new CategoryController();
