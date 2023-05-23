import { Body, Request, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AddCheckObjectDto } from './dto/add-check-object.dto';
import { CheckObjectService, CheckObjectStatus } from './services/check-object.service';
import { DeleteCheckObjectDto } from './dto/delete-check-object.dto';
import { UpdateCheckObjectDto } from './dto/update-check-object.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EnableIntegrationDto } from './dto/enable-integration.dto';
import { GetCheckObjectsPaginatedDto } from './dto/get-check-objects-paginated.dto';
import { CheckObjectEntity } from './entities/check-object.entity';

@ApiBearerAuth()
@ApiTags('checks')
@Controller()
export class CheckObjectController {
  constructor(private readonly checkObjectService: CheckObjectService) {}

  @UseGuards(JwtAuthGuard)
  @Post('addCheckObject')
  @HttpCode(200)
  public async addCheckObject(
    @Request()
    req,
    @Body()
    dto: AddCheckObjectDto
  ): Promise<string> {
    return this.checkObjectService.addCheckObject(req.user.userId, {
      ...dto,
      status: CheckObjectStatus.UNDEFINED,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('updateCheckObject')
  @HttpCode(200)
  public async updateCheckObject(
    @Request()
    req,
    @Body()
    dto: UpdateCheckObjectDto
  ): Promise<void> {
    const { user } = req;
    return this.checkObjectService.updateCheckObject(user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('deleteCheckObject')
  @HttpCode(200)
  public async deleteCheckObject(
    @Request()
    req,
    @Body()
    dto: DeleteCheckObjectDto
  ): Promise<void> {
    const { id } = dto;
    const { user } = req;
    return this.checkObjectService.deleteCheckObject(user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('enableIntegration')
  @HttpCode(200)
  public async enableIntegration(
    @Request()
    req,
    @Body()
    dto: EnableIntegrationDto
  ): Promise<void> {
    const { checkId, integrationId, status } = dto;
    const { user } = req;

    return this.checkObjectService.enableIntegration(user.id, checkId, integrationId, status);
  }

  @UseGuards(JwtAuthGuard)
  @Post('getCheckObjectsPaginated')
  @HttpCode(200)
  public async getCheckObjectsPaginated(
    @Request()
    req,
    @Body()
    dto: GetCheckObjectsPaginatedDto
  ): Promise<{
    items: CheckObjectEntity[];
    total: number;
  }> {
    const { pagination } = dto;
    const { user } = req;

    return this.checkObjectService.getCheckObjectsPaginated(user.id, pagination);
  }
}
