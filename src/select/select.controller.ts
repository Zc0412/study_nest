import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
} from '@nestjs/common';
import { SelectService } from './select.service';
import { CreateSelectDto } from './dto/create-select.dto';
import { UpdateSelectDto } from './dto/update-select.dto';

@Controller('select')
export class SelectController {
  constructor(private readonly selectService: SelectService) {}

  @Version('1')
  @Post()
  create(@Body() createSelectDto: CreateSelectDto) {
    console.log(createSelectDto);
    return this.selectService.create(createSelectDto);
  }

  @Get()
  findAllUser() {
    return this.selectService.findAllUser();
  }

  @Get('createUserAndPost')
  createUserAndPost() {
    return this.selectService.createUserAndPost();
  }

  @Get('postCount')
  postCount() {
    return this.selectService.postCount();
  }

  @Get('somePosts')
  findUsersWithSomePosts() {
    return this.selectService.findSomePost();
  }

  @Get('transaction')
  transaction() {
    return this.selectService.transaction();
  }

  @Get('postsPagination')
  postsPagination() {
    return this.selectService.postsPagination();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.selectService.findOneUser(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSelectDto: UpdateSelectDto) {
    return this.selectService.update(+id, updateSelectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.selectService.remove(+id);
  }
}
