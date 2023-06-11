import { CreateCategoryUseCase } from '@application/use-cases/category/create-category/create-category.use-case';
import { DeleteCategoryUseCase } from '@application/use-cases/category/delete-category/delete-category.use-case';
import { FindAllCategoriesUseCase } from '@application/use-cases/category/find-all-categories/find-all-categories.use-case';
import { FindCategoryUseCase } from '@application/use-cases/category/find-category/find-category.use-case';
import { UpdateCategoryUseCase } from '@application/use-cases/category/update-category/update-category.use-case';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryForm } from '../forms/category.form';

@Controller('category')
export class CategoryController {
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase,
    private findCategoryUseCase: FindCategoryUseCase,
    private findAllCategoriesUseCase: FindAllCategoriesUseCase,
    private updateCategoryUseCase: UpdateCategoryUseCase,
    private deleteCategoryUseCase: DeleteCategoryUseCase,
  ) {}

  @Get()
  public async findAllCategories() {
    const { categories } = await this.findAllCategoriesUseCase.execute();
    return categories;
  }

  @Get(':id')
  public async findCategory(@Param('id') id: string) {
    const { category } = await this.findCategoryUseCase.execute({ id });
    return category;
  }

  @Post()
  public async createCategory(@Body() categoryForm: CategoryForm) {
    const { category } = await this.createCategoryUseCase.execute({
      ...categoryForm,
    });

    return category;
  }

  @Put(':id')
  public async updateCategory(
    @Param('id') id: string,
    @Body() categoryForm: CategoryForm,
  ) {
    await this.updateCategoryUseCase.execute({
      id,
      ...categoryForm,
    });
  }

  @Delete(':id')
  public async deleteCategory(@Param('id') id: string) {
    await this.deleteCategoryUseCase.execute({ id });
  }
}
