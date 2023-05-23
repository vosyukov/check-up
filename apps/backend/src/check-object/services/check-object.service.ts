import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CheckObjectEntity } from '../entities/check-object.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IntegrationEntity } from '../../integrations/entities/integration.entity';
import { CheckIntegrationEntity, CheckIntegrationStatus } from '../entities/check-integration.entity';
import { PaginationDto } from '../../common/dto/pagination.dto';

export interface AddCheckObjectOptions {
  name: string;
  description?: string;
  period: number;
  grace: number;
  status: CheckObjectStatus;
}

export enum CheckObjectStatus {
  UP,
  DOWN,
  UNDEFINED,
}

export interface CheckObjectFilter {
  id?: string;
}

@Injectable()
export class CheckObjectService {
  constructor(
    @InjectRepository(CheckObjectEntity)
    private readonly checkObjectRepository: Repository<CheckObjectEntity>,
    @InjectRepository(IntegrationEntity)
    private readonly integrationRepository: Repository<IntegrationEntity>,
    @InjectRepository(CheckIntegrationEntity)
    private readonly checkIntegrationsRepository: Repository<CheckIntegrationEntity>
  ) {}

  public async addCheckObject(userId: string, options: AddCheckObjectOptions): Promise<string> {
    const { id } = await this.checkObjectRepository.save({
      userId,
      ...options,
    });
    return id;
  }

  public async getCheckObject(id: string): Promise<CheckObjectEntity> {
    return this.checkObjectRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  public async getCheckObjects(): Promise<CheckObjectEntity[]> {
    return this.checkObjectRepository.find({});
  }

  public async deleteCheckObject(userId: string, id: string): Promise<void> {
    await this.checkObjectRepository.delete({ id });
  }

  public async getCheckObjectsPaginated(
    userId: string,
    pagination: PaginationDto
  ): Promise<{
    items: CheckObjectEntity[];
    total: number;
  }> {
    const { offset, limit } = pagination;
    const [items, total] = await this.checkObjectRepository.findAndCount({
      where: {
        userId,
      },
      skip: offset,
      take: limit,
    });

    return {
      items,
      total,
    };
  }

  public async updateCheckObject(
    userId,
    options: {
      id: string;
      name?: string;
      lastPingTimestamp?: number;
      status?: CheckObjectStatus;
    }
  ): Promise<void> {
    const result = await this.checkObjectRepository.update(
      {
        id: options.id,
      },
      options
    );
    console.log(result);
    console.log(options);
  }

  public async enableIntegration(userId: string, checkId: string, integrationId: string, status: CheckIntegrationStatus): Promise<void> {
    const check = await this.checkObjectRepository.findOneOrFail({
      where: {
        id: checkId,
        userId: userId,
      },
    });
    const integration = await this.integrationRepository.findOneOrFail({
      where: {
        id: integrationId,
        userId,
      },
    });

    console.log(check);
    console.log(integration);

    const ci = this.checkIntegrationsRepository.create({
      check,
      integration,
      status,
    });
    await this.checkIntegrationsRepository.save(ci);

    // await this.checkObjectRepository.save(check)
  }
}
