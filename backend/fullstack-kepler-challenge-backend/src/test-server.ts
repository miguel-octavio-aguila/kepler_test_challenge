import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function testServer() {
  console.log('===== SERVER DIAGNOSTIC TEST =====');
  console.log('Node version:', process.version);
  console.log('Environment PORT:', process.env.PORT);
  
  try {
    console.log('\n1. Creating NestFactory...');
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });
    console.log('✓ NestFactory created');
    
    console.log('\n2. Enabling CORS...');
    app.enableCors();
    console.log('✓ CORS enabled');
    
    console.log('\n3. Getting server info...');
    const server = app.getHttpServer();
    console.log('✓ HTTP server obtained');
    
    const port = process.env.PORT ?? 4000;
    console.log(`\n4. Attempting to listen on port ${port}...`);
    
    await app.listen(port);
    
    console.log('\n===== SUCCESS =====');
    console.log(`✓ Server is listening on port ${port}`);
    console.log('✓ Available endpoints:');
    console.log(`  - http://localhost:${port}/`);
    console.log(`  - http://localhost:${port}/health`);
    console.log(`  - http://localhost:${port}/tasks`);
    console.log('==================');
    
  } catch (error) {
    console.error('\n===== ERROR =====');
    console.error('Server failed to start:');
    console.error(error);
    console.error('================');
    process.exit(1);
  }
}

testServer();
