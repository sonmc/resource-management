import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
