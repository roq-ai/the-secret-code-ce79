import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface NumerologyReportInterface {
  id?: string;
  person_name: string;
  birthday: any;
  report_content: string;
  company_id?: string;
  created_at?: any;
  updated_at?: any;

  company?: CompanyInterface;
  _count?: {};
}

export interface NumerologyReportGetQueryInterface extends GetQueryInterface {
  id?: string;
  person_name?: string;
  report_content?: string;
  company_id?: string;
}
