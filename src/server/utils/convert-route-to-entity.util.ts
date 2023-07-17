const mapping: Record<string, string> = {
  companies: 'company',
  'compatibility-reports': 'compatibility_report',
  'numerology-reports': 'numerology_report',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
