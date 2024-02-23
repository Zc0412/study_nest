import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { CatsModule } from './cats/cats.module';
import { logger } from './middleware/logger.middleware';
// import { CatsController } from './cats/cats.controller';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { RolesGuard } from './guard/roles.guard';
import { LoggingInterceptor } from './interceptor/logging.interceptor';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { FeatureModule } from './feature/feature.module';
import { PrismaService } from './prisma.service';
import { SelectModule } from './select/select.module';
import { PrismaModule } from './prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [
    // CatsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    // FeatureModule,
    SelectModule,
    PrismaModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    { provide: APP_FILTER, useClass: HttpExceptionFilter }, //全局依赖过滤器
    { provide: APP_GUARD, useClass: RolesGuard }, //全局守卫
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }, //全局拦截器
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
  ],
})

// 中间件
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer): any {
//     consumer.apply(logger).forRoutes(CatsController);
//   }
// }
export class AppModule {}
