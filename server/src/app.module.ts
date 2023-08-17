import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HttpModule } from '@infra/http/http.module';
import { DatabaseModule } from '@infra/database/database.module';
import { SecurityModule } from './infra/security/security.module';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, DatabaseModule, SecurityModule],
})
export class AppModule {}
