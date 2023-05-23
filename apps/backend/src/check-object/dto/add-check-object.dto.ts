import { ApiProperty } from '@nestjs/swagger';

export class AddCheckObjectDto {
  @ApiProperty()
  public name: string;

  @ApiProperty()
  public description: string;

  @ApiProperty()
  public period: number;

  @ApiProperty()
  public grace: number;
}
