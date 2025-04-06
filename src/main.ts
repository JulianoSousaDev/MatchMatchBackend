import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('MatchMatch API')
    .setDescription('API para o aplicativo MatchMatch')
    .setVersion('1.0')
    .addTag('auth', 'Endpoints de autenticação')
    .addTag('users', 'Endpoints de usuários')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
  console.log('Servidor rodando na porta 3000');
}
bootstrap(); 