import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { Uploader } from '@/domain/forum/application/storage/uploader'
import { PinataStorage } from './pinata-storage'

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: Uploader,
      useClass: PinataStorage,
    },
  ],
  exports: [Uploader],
})
export class StorageModule {}
