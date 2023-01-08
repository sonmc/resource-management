import { IsNotEmpty } from 'class-validator';
export class CreateProjectDto {
  @IsNotEmpty()
  name: string;
  note: string;
  start_date: Date;

}
