import { Global, Module } from '@nestjs/common';
import { UuidService } from './uuid/uuid.service';

@Global()
@Module({})
export class CommonModule {
    providers: [UuidService]
    exports: [UuidService]
}
