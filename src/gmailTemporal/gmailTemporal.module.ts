import { Module } from '@nestjs/common';
import { GmailTemporalService } from './gmailTemporal.service';
import { GmailTemporalController } from './gmailTemporal.controller';

@Module({
  providers: [GmailTemporalService],
  controllers: [GmailTemporalController],
  exports: [GmailTemporalService],
})
export class GmailTemporalModule {}
