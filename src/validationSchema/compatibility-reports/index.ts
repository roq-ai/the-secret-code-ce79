import * as yup from 'yup';

export const compatibilityReportValidationSchema = yup.object().shape({
  person1_name: yup.string().required(),
  person1_birthday: yup.date().required(),
  person2_name: yup.string().required(),
  person2_birthday: yup.date().required(),
  report_content: yup.string().required(),
  company_id: yup.string().nullable(),
});
