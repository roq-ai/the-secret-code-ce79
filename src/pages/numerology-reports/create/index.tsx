import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createNumerologyReport } from 'apiSdk/numerology-reports';
import { Error } from 'components/error';
import { numerologyReportValidationSchema } from 'validationSchema/numerology-reports';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { CompanyInterface } from 'interfaces/company';
import { getCompanies } from 'apiSdk/companies';
import { NumerologyReportInterface } from 'interfaces/numerology-report';

function NumerologyReportCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: NumerologyReportInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createNumerologyReport(values);
      resetForm();
      router.push('/numerology-reports');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<NumerologyReportInterface>({
    initialValues: {
      person_name: '',
      birthday: new Date(new Date().toDateString()),
      report_content: '',
      company_id: (router.query.company_id as string) ?? null,
    },
    validationSchema: numerologyReportValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Numerology Report
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="person_name" mb="4" isInvalid={!!formik.errors?.person_name}>
            <FormLabel>Person Name</FormLabel>
            <Input type="text" name="person_name" value={formik.values?.person_name} onChange={formik.handleChange} />
            {formik.errors.person_name && <FormErrorMessage>{formik.errors?.person_name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="birthday" mb="4">
            <FormLabel>Birthday</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.birthday ? new Date(formik.values?.birthday) : null}
                onChange={(value: Date) => formik.setFieldValue('birthday', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <FormControl id="report_content" mb="4" isInvalid={!!formik.errors?.report_content}>
            <FormLabel>Report Content</FormLabel>
            <Input
              type="text"
              name="report_content"
              value={formik.values?.report_content}
              onChange={formik.handleChange}
            />
            {formik.errors.report_content && <FormErrorMessage>{formik.errors?.report_content}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<CompanyInterface>
            formik={formik}
            name={'company_id'}
            label={'Select Company'}
            placeholder={'Select Company'}
            fetcher={getCompanies}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'numerology_report',
    operation: AccessOperationEnum.CREATE,
  }),
)(NumerologyReportCreatePage);
