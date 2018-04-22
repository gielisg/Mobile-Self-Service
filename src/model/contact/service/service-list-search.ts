export interface ServiceListSearch {
  BillingStartDateTime?: string;
  BillingEndDateTime?: string;
  ConnectionDateTime?: string;
  DisconnectionDateTime?: string;

  ParentServiceId?: number;
  ServiceNumber?: string;
  ServiceSalesPerson?: string;
  ServiceStatus?: string;
  ServiceStatusCode?: string;
  ServiceSystemStatus?: string;
  ServiceSystemStatusCode?: string;
  ServiceType?: string;
  ServiceTypeBillDescription?: string;
  ServiceTypeCode?: string;
  Subscriber?: string;
  SubscriberCode?: string;
  UserLabel?: string;

  ServiceStatusPhase?: number;
  ServiceSystemStatusPhase?: number;

  TakeRecords: number;
  SkipRecords: number;
  PageNumber: number;


}

export interface ServiceDisplayListRequest {
  SessionKey: string;
  PagingSortsAndFilters: PagingSortsAndFilters;
  TakeRecords:number;
  SkipRecords:number;
}

export interface PagingSortsAndFilters {
  Filter: Array<Filter>;
}
export interface Filter
{
  $type: string;
  PropertyName:string;
  CompareOperator:string;
  Value:string;
}