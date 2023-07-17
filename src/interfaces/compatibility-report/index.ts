import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface CompatibilityReportInterface {
  id?: string;
  person1_name: string;
  person1_birthday: any;
  person2_name: string;
  person2_birthday: any;
  report_content: string;
  company_id?: string;
  created_at?: any;
  updated_at?: any;

  company?: CompanyInterface;
  _count?: {};
}

export interface CompatibilityReportGetQueryInterface extends GetQueryInterface {
  id?: string;
  person1_name?: string;
  person2_name?: string;
  report_content?: string;
  company_id?: string;
}
