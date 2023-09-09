import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BlockchainService } from './blockchain/blockchain.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix(process.env.API_PREFIX);
  app.useGlobalPipes(new ValidationPipe());

  const blockchainService = app.get(BlockchainService);
  blockchainService.connectAndListen();

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
