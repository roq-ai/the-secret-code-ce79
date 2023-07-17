import axios from 'axios';
import queryString from 'query-string';
import { CompatibilityReportInterface, CompatibilityReportGetQueryInterface } from 'interfaces/compatibility-report';
import { GetQueryInterface } from '../../interfaces';

export const getCompatibilityReports = async (query?: CompatibilityReportGetQueryInterface) => {
  const response = await axios.get(`/api/compatibility-reports${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCompatibilityReport = async (compatibilityReport: CompatibilityReportInterface) => {
  const response = await axios.post('/api/compatibility-reports', compatibilityReport);
  return response.data;
};

export const updateCompatibilityReportById = async (id: string, compatibilityReport: CompatibilityReportInterface) => {
  const response = await axios.put(`/api/compatibility-reports/${id}`, compatibilityReport);
  return response.data;
};

export const getCompatibilityReportById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/compatibility-reports/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteCompatibilityReportById = async (id: string) => {
  const response = await axios.delete(`/api/compatibility-reports/${id}`);
  return response.data;
};
