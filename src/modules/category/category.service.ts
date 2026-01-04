import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { ConflictMessage, NotFoundMessage, publicMessage } from 'src/common/enums/message.enum';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { log } from 'console';
import { paginationGenerator, paginationSolver } from 'src/common/utils/pagination.util';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    let { title, priority } = createCategoryDto;
    title = await this.checkExistAndResolveTitle(title);
    const category = this.categoryRepository.create({ title, priority });
    await this.categoryRepository.save(category);
    return {
      message: publicMessage.Created,
      data: category
    };
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit, skip } = paginationSolver(paginationDto);
    const [categories, count] = await this.categoryRepository.findAndCount({
      skip,
      take: limit,
      where: {}
    });
    return {
      message: publicMessage.Success,
      data: categories,
      pagination: paginationGenerator(count, limit, page)
    };
  }

  findOne(id: number) {
    const categories = this.categoryRepository.findOneBy({ id });
    if (!categories) {
      throw new NotFoundException(NotFoundMessage.CategoryNotFound);
    }
    return {
      message: publicMessage.Success,
      data: categories
    };
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(NotFoundMessage.CategoryNotFound);
    }
    const { title, priority } = updateCategoryDto;
    if (title) {
      category.title = title;
    }
    if (priority) {
      category.priority = priority;
    }

    const saved = await this.categoryRepository.save(category);

    return {
      message: publicMessage.Updated,
      data: saved
    };
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(NotFoundMessage.CategoryNotFound);
    }
    await this.categoryRepository.delete({ id });
    return {
      message: publicMessage.Deleted
    };
  }
  async checkExistAndResolveTitle(inputTitle: string) {
    const title = inputTitle?.trim().toLowerCase();
    const category = await this.categoryRepository.findOneBy({ title });
    if (category) {
      throw new ConflictException(ConflictMessage.CategoryTitleExist);
    }
    return title;
  }
}
