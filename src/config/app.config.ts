interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Business Owner'],
  tenantName: 'Company',
  applicationName: 'The Secret Code of Numerology',
  addOns: ['file'],
};
