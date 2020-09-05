import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Query, Put, createParamDecorator } from '@nestjs/common';
import { Response } from 'express'
import { CreateProductDTO } from './dto/product.dto'
import { ProductService } from './product.service'
import { Product } from './interfaces/product.interface';

@Controller('product')
export class ProductController {

  constructor(private productService: ProductService) {}

  @Post('/create')
  async createPost(@Res() res: Response, @Body() createProductDTO: CreateProductDTO): Promise<Response<any>> {
    const product = await this.productService.createProduct(createProductDTO)
    return res.status(HttpStatus.OK).json({
      message: 'received',
      product
    })
  }

  @Get('/')
  async getProducts(@Res() res: Response): Promise<Response<any>> {
    const products = await this.productService.getProducts()
    return res.status(HttpStatus.OK).json({
      products
    })
  }

  @Get('/:productID')
  async getProduct(@Res() res: Response, @Param('productID') productID: string): Promise<Response<any>> {
    const product = await this.productService.getProduct(productID)
    if(!product) throw new NotFoundException('Product does not exists')
    return res.status(HttpStatus.OK).json({
      product
    })
  }

  @Delete('/delete')
  async deleteProduct(@Res() res: Response, @Query('productID') productID: string): Promise<Response<any>> {
    const productDeleted = await this.productService.deleteProduct(productID)
    if(!productDeleted) throw new NotFoundException('Product does not exists')
    return res.status(HttpStatus.OK).json({
      message: 'Product deleted successfully',
      productDeleted
    })
  }

  @Put('/update')
  async updateProduct(@Res() res: Response, @Body()  createProductDTO: CreateProductDTO, @Query('productID') productID: string): Promise<Response<Product>> {
    const updatedProduct = await this.productService.updateProducts(productID, createProductDTO)
    if(!updatedProduct) throw new NotFoundException('Product does not exists')
    console.log(updatedProduct)
    return res.status(HttpStatus.OK).json({
      message: 'Product updated successfully',
      updatedProduct
    })
  }
}
