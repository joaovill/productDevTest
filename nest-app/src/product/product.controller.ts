import { Controller, Get, Post, Body, Patch, Param, UseInterceptors, UploadedFiles, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ActualUser } from 'src/authentication/decorators/actual-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../config/multer.config';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(@ActualUser() user: User) {
    return this.productService.findAll();
  }

  @Post()
  @UseInterceptors(FilesInterceptor('images', 4, multerConfig)) 
  create(@UploadedFiles() images: Array<Express.Multer.File>, @Body() createProductDto: CreateProductDto, @ActualUser() user: User) {
    console.log(createProductDto);
    const imagePaths = images.map(file => file.path.replace(/\\/g, '/'))

    return this.productService.create({ ...createProductDto, images: imagePaths });
  }

  @Get('/:id')
  findOne(@Param('id') id: string,  @ActualUser() user: User) {
    return this.productService.findById(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @ActualUser() user: User) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete('/:id/delete')
  remove(@Param('id') id: string, @ActualUser() user: User) {
    return this.productService.deleteProduct(id);
  }
}
