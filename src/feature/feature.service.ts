import { Injectable } from '@nestjs/common';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FeatureService {
  constructor(private configService: ConfigService) {}
  create(createFeatureDto: CreateFeatureDto) {
    return 'This action adds a new feature';
  }

  findAll() {
    const db = this.configService.get<string>('DEV_DATABASE_USER');
    console.log(db);
    return `This action returns all feature`;
  }

  findOne(id: number) {
    return `This action returns a #${id} feature`;
  }

  update(id: number, updateFeatureDto: UpdateFeatureDto) {
    return `This action updates a #${id} feature`;
  }

  remove(id: number) {
    return `This action removes a #${id} feature`;
  }
}
