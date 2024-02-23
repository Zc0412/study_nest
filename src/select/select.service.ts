import { Injectable } from '@nestjs/common';
import { CreateSelectDto } from './dto/create-select.dto';
import { UpdateSelectDto } from './dto/update-select.dto';
import { PrismaService } from '../prisma.service';
import { set } from 'zod';

@Injectable()
export class SelectService {
  constructor(private prisma: PrismaService) {}

  // 创建user
  async create(data) {
    return await this.prisma.user.create({
      data,
    });
  }

  async createUserAndPost() {
    // 使用create
    // return await this.prisma.user.create({
    //   data: {
    //     email: 'yveee@prisma.io',
    //     name: 'Elsa Prisma',
    //     posts: {
    //       create: [
    //         {
    //           title: 'How to make an omelette',
    //           categories: {
    //             create: { name: 'Easy cooking' },
    //           },
    //         },
    //         { title: 'How to eat an omelette' },
    //       ],
    //     },
    //   },
    //   include: {
    //     posts: {
    //       include: {
    //         categories: true,
    //       },
    //     },
    //   },
    // });
    // 创建user 并且创建多个post
    // return await this.prisma.user.create({
    //   data: {
    //     email: 'saanvi@prisma.io',
    //     posts: {
    //       createMany: {
    //         data: [{ title: 'My first post' }, { title: 'My second post' }],
    //       },
    //     },
    //   },
    //   include: {
    //     posts: true,
    //   },
    // });
    //  创建user 连接多个记录
    // return await this.prisma.user.create({
    //   data: {
    //     email: 'vlad@prisma.io',
    //     posts: {
    //       connect: [{ id: 4 }, { id: 5 }, { id: 6 }],
    //     },
    //   },
    //   include: {
    //     posts: true,
    //   },
    // });
    // 连接单个记录
    // return await this.prisma.user.update({
    //   where: {
    //     id: 9,
    //   },
    //   data: {
    //     posts: {
    //       connect: {
    //         id: 2,
    //       },
    //     },
    //   },
    //   include: {
    //     posts: true,
    //   },
    // });
    // 创建post 连接user 如果user存在直接连接，如果不存在创建
    // return await this.prisma.post.create({
    //   data: {
    //     title: 'How to make croissants',
    //     author: {
    //       connectOrCreate: {
    //         where: {
    //           email: 'viola@prisma.io',
    //         },
    //         create: {
    //           email: 'viola@prisma.io',
    //           name: 'Viola',
    //         },
    //       },
    //     },
    //   },
    //   include: {
    //     author: true,
    //   },
    // });
    return await this.prisma.user.update({
      where: {
        id: 23,
      },
      data: {
        posts: {
          set: [],
        },
      },
      include: {
        posts: true,
      },
    });
  }

  // 查询单个user
  async findOneUser(id: number) {
    // id查询
    // return await this.prisma.user.findUnique({
    //   where: {
    //     id: +id,
    //   },
    // });
    // select选择返回字段
    return await this.prisma.user.findUnique({
      where: {
        id: +id,
      },
      select: { email: true, name: true },
    });
  }

  // 查询所有用户
  async findAllUser() {
    // 控制用户字段同时控制post字段
    // return await this.prisma.user.findMany({
    //   select: {
    //     name: true,
    //     posts: {
    //       select: {
    //         id: true,
    //       },
    //     },
    //   },
    // });
    // 返回所有用户数据 post只返回title
    // return await this.prisma.user.findMany({
    //   include: {
    //     posts: {
    //       select: {
    //         title: true,
    //       },
    //     },
    //   },
    // });
    // 返回单个用户和特定的帖子
    // return await this.prisma.user.findFirst({
    //   include: { posts: true },
    // });
    // 可以添加帖子计数
    // return await this.prisma.user.findFirst({
    //   include: {
    //     posts: {
    //       include: {
    //         categories: true,
    //       },
    //     },
    //     _count: {
    //       select: { posts: true },
    //     },
    //   },
    // });
    // 组合查询;
    return await this.prisma.user.findMany({
      where: {
        email: {
          endsWith: 'prisma.io',
        },
        posts: {
          some: {
            published: true,
          },
        },
      },
      include: {
        posts: {
          where: {
            published: true,
          },
        },
      },
      orderBy: {
        // name: 'asc',
        posts: {
          _count: 'desc',
        },
      },
    });
  }

  // 分页查询;
  async postsPagination() {
    return await this.prisma.post.findMany({
      skip: 1,
      take: 100,
      where: {
        title: {
          contains: 'My second',
        },
      },
      orderBy: {
        title: 'desc',
      },
    });
  }

  // 查询计数
  async postCount() {
    return await this.prisma.post.count({
      where: {
        authorId: 23,
      },
    });
  }

  // 事务
  async transaction() {
    return await this.prisma.$transaction([
      this.prisma.post.findMany({ where: { title: { contains: 'post' } } }),
      this.prisma.post.count(),
    ]);
  }

  async findSomePost() {
    return this.prisma.user.findMany({
      where: {
        posts: {
          some: {},
        },
      },
      include: {
        posts: true,
      },
    });
  }

  update(id: number, updateSelectDto: UpdateSelectDto) {
    return `This action updates a #${id} select`;
  }

  remove(id: number) {
    return `This action removes a #${id} select`;
  }
}
