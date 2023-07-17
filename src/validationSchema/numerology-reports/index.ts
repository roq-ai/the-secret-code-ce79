import * as yup from 'yup';

export const numerologyReportValidationSchema = yup.object().shape({
  person_name: yup.string().required(),
  birthday: yup.date().required(),
  report_content: yup.string().required(),
  company_id: yup.string().nullable(),
});
