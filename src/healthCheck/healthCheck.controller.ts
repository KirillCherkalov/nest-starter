import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('health-check')
@ApiBearerAuth()
@Controller('health-check')
export class HealthCheckController {
  @Get()
  async checkHealth(): Promise<void> {
    return undefined;
  }
}
