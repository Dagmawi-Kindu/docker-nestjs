import * as dotenv from 'dotenv';
dotenv.config();
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ICreateNote, IUpdateNote } from 'src/user/user.interface';
import { Note, User } from '@prisma/client';
import { UserAuthService } from 'src/user/services/userAuth.service';

@Injectable()
export class NoteService {
  constructor(private prisma: PrismaService) {}

  async checkUser(uid: string) {
    let checkUser = await this.prisma.user.findFirst({
      where: {
        id: uid,
      },
    });
    if (!checkUser) {
      throw new HttpException('Invalid ID!', HttpStatus.BAD_REQUEST);
    } else {
      return checkUser;
    }
  }
  async checkNote(nid: string) {
    let checkNote = await this.prisma.note.findFirst({
      where: {
        id: nid,
      },
    });
    if (!checkNote) {
      throw new HttpException('Invalid ID!', HttpStatus.BAD_REQUEST);
    } else {
      return checkNote;
    }
  }

  async createNote(note: ICreateNote, user: User) {
    console.log(user);

    let newNote = await this.prisma.note.create({
      data: {
        ...note,
        user: {
          connect: { id: user.id },
        },
      },
    });

    return newNote;
  }
  async updateNote(notes: IUpdateNote, note: Note) {
    console.log(notes);

    let { title, content } = notes;

    title = title === '' ? note.title : title;
    content = content === '' ? note.content : content;
    let updatedNote = await this.prisma.note.update({
      where: { id: note.id },
      data: {
        title: title,
        content: content,
      },
    });
    return updatedNote;
  }
}
