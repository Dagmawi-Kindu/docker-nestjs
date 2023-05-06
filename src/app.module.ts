import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from 'prisma/prisma.module';
import { NoteModule } from './Note/note.module';

@Module({
  imports: [PrismaModule, UserModule, NoteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
