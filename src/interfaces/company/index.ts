import { CompatibilityReportInterface } from 'interfaces/compatibility-report';
import { NumerologyReportInterface } from 'interfaces/numerology-report';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CompanyInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  compatibility_report?: CompatibilityReportInterface[];
  numerology_report?: NumerologyReportInterface[];
  user?: UserInterface;
  _count?: {
    compatibility_report?: number;
    numerology_report?: number;
  };
}

export interface CompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
