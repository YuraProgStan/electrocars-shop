import { Module } from '@nestjs/common';
import { UploadimageController } from './uploadimage.controller';
import { UploadimageService } from './uploadimage.service';

@Module({
  controllers: [UploadimageController],
  providers: [UploadimageService]
})
export class UploadimageModule {}
