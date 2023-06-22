import { AppConfigService } from './config/app/config.service';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // set global prefix for all routes (e.g. /api/v3)
  app.setGlobalPrefix('api/v3');

  const appConfig: AppConfigService = app.get(AppConfigService);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }}));

    // CORS
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Accept',
      credentials: true,
    });

  const openAPIConfig = new DocumentBuilder()
    .setTitle(appConfig.name || 'NestJS API')
    .setDescription('The API description')
    .setVersion('3.0')
    .build();

  const document = SwaggerModule.createDocument(app, openAPIConfig);

  SwaggerModule.setup('api/v3', app, document);


  // const jwtConfig: JwtConfigService = app.get(JwtConfigService);

  // console.log(jwtConfig.accessTokenSecret);
  // console.log(jwtConfig.refreshTokenSecret);
  // console.log(jwtConfig.accessTokenExpiresIn);
  // console.log(jwtConfig.refreshTokenExpiresIn);

  await app.listen(appConfig.port || 8000, () => {
    Logger.log(`Server running on http://localhost:${appConfig.port}`, 'Bootstrap');
  });
}
bootstrap();
