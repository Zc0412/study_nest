import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './middleware/logger.middleware';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose', 'fatal'],
  });
  // 全局中间件
  app.use(logger);
  app.useGlobalPipes(new ValidationPipe());
  // 全局注入过滤器方式
  // app.useGlobalFilters(new HttpExceptionFilter());
  // 全局注入守卫方式;
  // app.useGlobalGuards(new RolesGuard());
  // 全局注入拦截器
  // app.useGlobalInterceptors(new LoggingInterceptor());
  //   版本控制
  app.enableVersioning({
    // 路由版本控制
    type: VersioningType.URI,
    // type: VersioningType.HEADER,
    // header: 'Custom-Header',
  });
  await app.listen(3000);
}

bootstrap();
