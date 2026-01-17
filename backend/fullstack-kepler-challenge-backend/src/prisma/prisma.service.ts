import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // Get DATABASE_URL from environment, default to "file:./dev.db"
    const connectionString = process.env.DATABASE_URL || 'file:./dev.db';

    // Initialize adapter with url parameter as per Prisma 7 documentation
    const adapter = new PrismaBetterSqlite3({ url: connectionString });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
