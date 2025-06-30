import { Get, Controller } from '@nestjs/common';

@Controller('live')
export class LiveController {
  @Get('status')
  getStatus() {
    return {
      stream_url: 'http://localhost:8080/hls/stream.m3u8',
    };
  }
}
