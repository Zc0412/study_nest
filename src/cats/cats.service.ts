import { Injectable } from '@nestjs/common';
import { User, Prisma, Post } from '@prisma/client';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CatsService {
  constructor(private prisma: PrismaService) {}

  // create(createCatDto: CreateCatDto) {
  //   return 'This action adds a new cat';
  // }
  //
  // // 创建一个用户
  // async createUser(data: Prisma.UserCreateInput): Promise<User> {
  //   return this.prisma.user.create({
  //     data,
  //   });
  // }
  //
  // // 创建多个用户
  // async createUsers(data) {
  //   return await this.prisma.user.createMany(data);
  // }
  //
  // // 通过邮箱查询记录
  // async findUniqueEmail(email) {
  //   return await this.prisma.user.findUnique({
  //     where: { email },
  //   });
  // }
  //
  // // 查询所有的用户 跳过前3条 返回4条
  // async findUsers() {
  //   try {
  //     return await this.prisma.user.findMany({
  //       skip: 3,
  //       take: 6,
  //     });
  //   } catch (e) {
  //     return e;
  //   }
  // }
  //
  // // 邮箱结尾格式查找 并按id排序
  // async findEndsWith() {
  //   return await this.prisma.user.findMany({
  //     where: { email: { endsWith: 'qq.com' } },
  //     orderBy: { id: 'desc' },
  //   });
  // }
  //
  // // 组合查询
  // async findStartsWith() {
  //   return await this.prisma.user.findMany({
  //     where: {
  //       OR: [
  //         {
  //           name: {
  //             startsWith: 'A',
  //           },
  //         },
  //         {
  //           AND: {
  //             email: {
  //               endsWith: 'q@qq.com',
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   });
  // }
  //
  // // 查询公开的post至少一个和邮箱固定结尾
  // async findPublishPost() {
  //   return await this.prisma.user.findMany({
  //     where: {
  //       email: {
  //         endsWith: '@qq.com',
  //       },
  //       posts: {
  //         some: {
  //           published: true,
  //         },
  //       },
  //     },
  //   });
  // }
  //
  // // 查询特定的用户，返回特定的字段
  // async findUserSelectEmailAndName(email) {
  //   return await this.prisma.user.findUnique({
  //     where: {
  //       email,
  //     },
  //     select: {
  //       email: true,
  //       name: true,
  //       id: false,
  //       posts: {
  //         select: {
  //           title: true,
  //           authorId: true,
  //           content: true,
  //         },
  //       },
  //     },
  //   });
  // }
  //
  // // 跟新用户邮箱和name
  // async updateUser({ email, name }) {
  //   return await this.prisma.user.update({
  //     where: { email },
  //     data: {
  //       name,
  //     },
  //   });
  // }
  //
  // // 删除单个用户
  // async deleteUser(email) {
  //   return await this.prisma.user.delete({
  //     where: {
  //       email,
  //     },
  //   });
  // }
  //
  // // 创建post
  // async createPost(data: Prisma.PostCreateInput): Promise<Post> {
  //   return this.prisma.post.create({
  //     data,
  //   });
  // }
  //
  // // 创建一条数据
  // async createUserAndPost() {
  //   return await this.prisma.user.create({
  //     data: {
  //       name: 'Alice',
  //       email: 'alice@prisma.io',
  //       posts: {
  //         create: {
  //           title: 'Join us for Prisma Day 2020',
  //         },
  //       },
  //     },
  //   });
  // }
  //
  // async updatePost(id: number) {
  //   return await this.prisma.post.update({
  //     where: { id },
  //     data: { published: true },
  //   });
  // }
  //
  // async filteredPosts() {
  //   return await this.prisma.post.findMany({
  //     where: {
  //       OR: [
  //         { title: { contains: 'prisma' } },
  //         // { content: { contains: 'prisma' } },
  //       ],
  //     },
  //   });
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} cat`;
  // }
  //
  // update(id: number, updateCatDto: UpdateCatDto) {
  //   return `This action updates a #${id} cat`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} cat`;
  // }
}
