export interface ICandidateRepository {
    createOrUpdate(file): Promise<any>;
    findAll(param: any): Promise<any>;
    findOne(id: number): Promise<any>;
}
