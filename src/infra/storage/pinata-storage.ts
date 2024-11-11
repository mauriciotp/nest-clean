import {
  Uploader,
  UploadParams,
} from '@/domain/forum/application/storage/uploader'
import { Injectable } from '@nestjs/common'
import { PinataSDK } from 'pinata'
import { EnvService } from '../env/env.service'

@Injectable()
export class PinataStorage implements Uploader {
  private pinata: PinataSDK

  constructor(envService: EnvService) {
    this.pinata = new PinataSDK({
      pinataJwt: envService.get('PINATA_JWT'),
      pinataGateway: envService.get('GATEWAY_URL'),
    })
  }

  async upload({
    fileName,
    fileType,
    body,
  }: UploadParams): Promise<{ url: string }> {
    const file = new File([body], fileName, { type: fileType })

    const upload = await this.pinata.upload.file(file)

    const uniqueFileName = `${upload.id}-${fileName}`

    return {
      url: uniqueFileName,
    }
  }
}
