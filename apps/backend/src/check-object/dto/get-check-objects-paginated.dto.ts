import { PaginationDto } from '../../common/dto/pagination.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class GetCheckObjectsPaginatedDto {
  @ValidateNested()
  @Type(() => PaginationDto)
  pagination!: PaginationDto;
}
