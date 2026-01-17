import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    console.log('Starting application...');
    const app = await NestFactory.create(AppModule);
    console.log('NestFactory created successfully');

    // Enable CORS for frontend communication
    app.enableCors();
    console.log('CORS enabled');

    const port = process.env.PORT ?? 4000;
    console.log(`Attempting to listen on port ${port}...`);
    
    await app.listen(port);
    
    console.log(`✓ Application is running on: http://localhost:${port}`);
    console.log(`✓ Health check available at: http://localhost:${port}/health`);
    console.log(`✓ Tasks API available at: http://localhost:${port}/tasks`);
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}
bootstrap();
