import { Module } from '@nestjs/common';
import { RemoveimageController } from './removeimage.controller';
import { RemoveimageService } from './removeimage.service';

@Module({
  controllers: [RemoveimageController],
  providers: [RemoveimageService]
})
export class RemoveimageModule {}
