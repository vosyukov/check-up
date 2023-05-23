import { ApiProperty } from '@nestjs/swagger';

export class AddIntegrationDto {
  @ApiProperty()
  type: 'email' | 'slack';

  @ApiProperty()
  email: string;
}
