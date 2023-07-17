import axios from 'axios';
import queryString from 'query-string';
import { NumerologyReportInterface, NumerologyReportGetQueryInterface } from 'interfaces/numerology-report';
import { GetQueryInterface } from '../../interfaces';

export const getNumerologyReports = async (query?: NumerologyReportGetQueryInterface) => {
  const response = await axios.get(`/api/numerology-reports${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createNumerologyReport = async (numerologyReport: NumerologyReportInterface) => {
  const response = await axios.post('/api/numerology-reports', numerologyReport);
  return response.data;
};

export const updateNumerologyReportById = async (id: string, numerologyReport: NumerologyReportInterface) => {
  const response = await axios.put(`/api/numerology-reports/${id}`, numerologyReport);
  return response.data;
};

export const getNumerologyReportById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/numerology-reports/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteNumerologyReportById = async (id: string) => {
  const response = await axios.delete(`/api/numerology-reports/${id}`);
  return response.data;
};
