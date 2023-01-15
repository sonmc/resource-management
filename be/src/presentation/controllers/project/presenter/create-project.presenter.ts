import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectPresenter {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    note: string;
    @ApiProperty()
    start_date: Date;
}
