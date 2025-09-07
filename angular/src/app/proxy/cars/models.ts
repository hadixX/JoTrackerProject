import { AuditedEntityDto } from "@abp/ng.core";

export interface CarDto extends AuditedEntityDto<string> {
  name?: string;
  latitude:number;
  longitude:number;
}