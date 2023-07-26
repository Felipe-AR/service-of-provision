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
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryForm } from '../forms/category.form';
import {
  CategoryDTO,
  CategoryViewModel,
} from '../view-models/category-view-model';

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
  @HttpCode(HttpStatus.OK)
  public async findAllCategories() {
    const { categories } = await this.findAllCategoriesUseCase.execute();
    return categories.map(CategoryViewModel.toHTTP);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async findCategory(@Param('id') id: string): Promise<CategoryDTO> {
    const { category } = await this.findCategoryUseCase.execute({ id });
    return CategoryViewModel.toHTTP(category);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createCategory(
    @Body() categoryForm: CategoryForm,
  ): Promise<CategoryDTO> {
    const { category } = await this.createCategoryUseCase.execute({
      ...categoryForm,
    });

    return CategoryViewModel.toHTTP(category);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async updateCategory(
    @Param('id') id: string,
    @Body() categoryForm: CategoryForm,
  ): Promise<void> {
    await this.updateCategoryUseCase.execute({
      id,
      ...categoryForm,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteCategory(@Param('id') id: string): Promise<void> {
    await this.deleteCategoryUseCase.execute({ id });
  }
}
