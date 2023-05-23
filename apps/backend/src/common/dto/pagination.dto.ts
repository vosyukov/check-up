import { IsNumber } from 'class-validator';

export class PaginationDto {
  @IsNumber({})
  public offset: number;

  public limit: number;
}
