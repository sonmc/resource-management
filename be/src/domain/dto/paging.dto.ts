export class PagingDataDto {
  datas: any;
  hasMore: boolean;
  constructor(_datas: any, _hasMore: boolean) {
    this.datas = _datas;
    this.hasMore = _hasMore;
  }
}
