import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Redirect,
  HttpException,
  HttpStatus,
  UseFilters,
  ParseIntPipe,
  UsePipes,
  UseGuards,
  UseInterceptors,
  Put,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { User as UserModel, Post as PostModel } from '@prisma/client';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { HttpExceptionFilter } from '../filter/http-exception.filter';
import { ZodValidationPipe } from '../pipe/validation.pipe';
import { createCatSchema } from './zod/cartSchema';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../decorator/roles.decorator';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';
import { User } from '../decorator/user.decorator';

@Controller('cats')
// @UseInterceptors(LoggingInterceptor) //绑定拦截器
// @UseGuards(RolesGuard) //绑定守卫
// @UseFilters(HttpExceptionFilter) //过滤器 局部添加方式
export class CatsController {
  // constructor(private readonly catsService: CatsService) {}
  // constructor(private catsService: CatsService) {}
  //
  // // @Post()
  // // // @HttpCode(204)
  // // // @Header('Cache-Control', 'none')
  // // create(@Body() createCatDto: CreateCatDto) {
  // //   return createCatDto;
  // //   // return this.catsService.create(createCatDto);
  // // }
  //
  // // zod
  // // @Post()
  // // @UsePipes(new ZodValidationPipe(createCatSchema))
  // // create(@Body() createCatDto: CreateCatDto) {
  // //   return createCatDto;
  // //   // return this.catsService.create(createCatDto);
  // // }
  //
  // @Post()
  // @Roles(['admin'])
  // create(@Body() createCatDto: CreateCatDto) {
  //   return createCatDto;
  //   // return this.catsService.create(createCatDto);
  // }
  //
  // // *通配符
  // // @Get('ab*cd')
  // // findOne() {
  // //   return '*通配符';
  // // }
  //
  // // 异步async
  // // @Get('async')
  // // async findOneAsync() {
  // //   return [];
  // // }
  //
  // // @Get('decorator')
  // // findUser(@User('userName') username: string) {
  // //   console.log(username);
  // //   return 'decorator';
  // // }
  //
  // // 获取params
  // // @Get(':userId')
  // // findOneId(@Param('userId', ParseIntPipe) userId: string) {
  // //   //or  @Param()
  // //   console.log(userId);
  // //   return `id:${userId}`;
  // // }
  //
  // // pipe 管道验证
  // // @Get(':userId')
  // // findOneId(
  // //   @Param(
  // //     'userId',
  // //     new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  // //   )
  // //   userId: string,
  // // ) {
  // //   //or  @Param()
  // //   console.log(userId);
  // //   return `id:${userId}`;
  // // }
  //
  // @Get()
  // findAll(@Req() request: Request) {
  //   // 覆盖整个响应主体并提供错误原因的示例
  //   // throw new HttpException(
  //   //   {
  //   //     status: HttpStatus.FORBIDDEN,
  //   //     error: 'This is a custom message',
  //   //   },
  //   //   HttpStatus.FORBIDDEN,
  //   //   {
  //   //     cause: 'error',
  //   //   },
  //   // );
  //   throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  //   // return this.catsService.findAll();
  // }
  //
  // @Get('redirect')
  // @Redirect('https://baidu.com')
  // findRedirect(@Req() request: Request) {
  //   // console.log(request);
  //   //   返回值会覆盖@Redirect()装饰器的任何参数
  //   // return { url: 'https://nest.nodejs.cn/v5/' };
  //   return this.catsService.findUsers();
  // }
  //
  // @Post('user')
  // async signupUser(
  //   @Body() userData: { name?: string; email: string },
  // ): Promise<UserModel> {
  //   return this.catsService.createUser(userData);
  // }
  //
  // // 创建多个用户
  // @Post('users')
  // async createUsers(@Body() users) {
  //   return this.catsService.createUsers(users);
  // }
  //
  // // 查询所有的用户信息
  // @Get('users')
  // async findUsers() {
  //   return await this.catsService.findUsers();
  // }
  //
  // // 按邮箱结尾格式查找
  // @Get('endsWith')
  // async findEndsWithEmail() {
  //   return await this.catsService.findEndsWith();
  // }
  //
  // // 组合查询
  // @Get('startsWith')
  // async findStartsWithNameAndEmail() {
  //   return await this.catsService.findStartsWith();
  // }
  //
  // // 查询公开post用户
  // @Get('publishPost')
  // async findPublishPost() {
  //   return await this.catsService.findPublishPost();
  // }
  //
  // // 选择字段返回
  // @Get('userSelect')
  // async findUserSelectEmailAndName(@Query('email') email) {
  //   return await this.catsService.findUserSelectEmailAndName(email);
  // }
  //
  // // 通过email查找用户
  // @Get(':email')
  // async findUniqueEmail(@Param('email') email: string) {
  //   return this.catsService.findUniqueEmail(email);
  // }
  //
  // // 更新用户信息name email
  // @Patch('updateUser')
  // async updateUserNameAndEmail(@Body() userData) {
  //   return await this.catsService.updateUser(userData);
  // }
  //
  // // 删除一个用户
  // @Delete('deleteUser')
  // async deleteUser(@Body('email') email) {
  //   return await this.catsService.deleteUser(email);
  // }
  //
  // @Get('createUserAndPost')
  // async createUserAndPost() {
  //   return await this.catsService.createUserAndPost();
  // }
  //
  // @Get('filterPosts')
  // filteredPosts() {
  //   return this.catsService.filteredPosts();
  // }
  //
  // @Put('updatePost')
  // async updatePost(@Body('id') id: number) {
  //   console.log(id);
  //   return await this.catsService.updatePost(id);
  // }
  //
  // @Post('post')
  // async createDraft(
  //   @Body() postData: { title: string; content?: string; authorEmail: string },
  // ): Promise<PostModel> {
  //   const { title, content, authorEmail } = postData;
  //   return this.catsService.createPost({
  //     title,
  //     content,
  //     author: {
  //       connect: { email: authorEmail },
  //     },
  //   });
  // }
}
