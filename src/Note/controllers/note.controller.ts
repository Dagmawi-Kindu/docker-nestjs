import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  ParseUUIDPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { Param, Patch } from '@nestjs/common/decorators';
import { NoteService } from '../services/note.service';
import { CreateNoteDto } from '../dtos/create_note.dto';
import { UpdateNoteDto } from '../dtos/update_note.dto';

@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Post('note/createNote/:uid')
  @UsePipes(ValidationPipe)
  async CreateNote(
    @Param('uid', ParseUUIDPipe) uid: string,
    @Body()
    createNoteDto: CreateNoteDto,
  ) {
    let checkUser = await this.noteService.checkUser(uid);
    return this.noteService.createNote(createNoteDto, checkUser);
  }
  @Patch('note/update/:nid')
  @UsePipes(ValidationPipe)
  async UpdateNote(
    @Param('nid', ParseUUIDPipe) nid: string,
    @Body()
    updateNoteDto: UpdateNoteDto,
  ) {
    let checkNote = await this.noteService.checkNote(nid);
    return this.noteService.updateNote(updateNoteDto, checkNote);
  }
}
