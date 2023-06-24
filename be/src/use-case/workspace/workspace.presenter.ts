import { Min, Max } from 'class-validator';
export class WorkspacePresenter {
    @Min(0)
    @Max(10)
    title: string = '';
    @Min(1)
    description: string = '';
    admin_id: string = '';
}
