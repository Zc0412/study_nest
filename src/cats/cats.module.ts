import { Global, Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
// import { PrismaService } from './../prisma.service';

// @Global() //注册为全局模块
@Module({
  imports: [],
  controllers: [CatsController],
  providers: [
    CatsService, //PrismaService
  ],
  exports: [CatsService], //导出
})
export class CatsModule {}
