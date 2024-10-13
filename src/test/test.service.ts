import { Injectable } from '@nestjs/common';
import { UuidService } from 'src/common/uuid/uuid.service';

@Injectable()
export class TestService {
  constructor(private readonly uuidService: UuidService) {}

  getTestUuid(): string {
    return this.uuidService.generateUuid();
  }
}
