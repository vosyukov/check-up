import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AddIntegrationDto } from './dto/add-integration.dto';
import { EmailService } from './services/email.service';
import { VerifyIntegrationDto } from './dto/verify-integration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IntegrationEntity, IntegrationStatus } from './entities/integration.entity';
import { Repository } from 'typeorm';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller()
export class IntegrationsController {
  constructor(
    private readonly emailService: EmailService,
    @InjectRepository(IntegrationEntity)
    private readonly integrationRepository: Repository<IntegrationEntity>
  ) {}

  @Get(':id/verifyIntegration')
  public async verifyIntegration(
    @Param()
    dto: VerifyIntegrationDto
  ): Promise<void> {
    const { id } = dto;

    await this.integrationRepository.update(id, {
      status: IntegrationStatus.VERIFIED,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('addIntegration')
  public async addIntegration(
    @Body()
    dto: AddIntegrationDto,
    @Request()
    req
  ): Promise<void> {
    const { email } = dto;
    const { user } = req;

    await this.emailService.add(user.userId, email);
  }
}
