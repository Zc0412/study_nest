import { Injectable } from '@nestjs/common';
import { CatsService } from './cats/cats.service';

@Injectable()
export class AppService {
  // constructor(private catsService: CatsService) {}
  getHello() {
    return '';
  }
}
