import { Controller, Get, Param } from '@nestjs/common';
import { PingHandlerService } from './services/ping-handler.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('ping')
@Controller()
export class PingHandlerController {
  constructor(private readonly pingHandlerService: PingHandlerService) {}

  @Get(':id')
  public async handleOk(
    @Param()
    params
  ): Promise<string> {
    await this.pingHandlerService.handleOk(params.id);
    return 'ok';
  }

  @Get(':id/fail')
  public async handleFail(): Promise<string> {
    return 'ok';
  }

  @Get(':id/log')
  public async handleLog(): Promise<string> {
    return 'ok';
  }
}
