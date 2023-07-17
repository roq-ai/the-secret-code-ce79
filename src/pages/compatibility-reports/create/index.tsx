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
import { createCompatibilityReport } from 'apiSdk/compatibility-reports';
import { Error } from 'components/error';
import { compatibilityReportValidationSchema } from 'validationSchema/compatibility-reports';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { CompanyInterface } from 'interfaces/company';
import { getCompanies } from 'apiSdk/companies';
import { CompatibilityReportInterface } from 'interfaces/compatibility-report';

function CompatibilityReportCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CompatibilityReportInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCompatibilityReport(values);
      resetForm();
      router.push('/compatibility-reports');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CompatibilityReportInterface>({
    initialValues: {
      person1_name: '',
      person1_birthday: new Date(new Date().toDateString()),
      person2_name: '',
      person2_birthday: new Date(new Date().toDateString()),
      report_content: '',
      company_id: (router.query.company_id as string) ?? null,
    },
    validationSchema: compatibilityReportValidationSchema,
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
            Create Compatibility Report
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="person1_name" mb="4" isInvalid={!!formik.errors?.person1_name}>
            <FormLabel>Person 1 Name</FormLabel>
            <Input type="text" name="person1_name" value={formik.values?.person1_name} onChange={formik.handleChange} />
            {formik.errors.person1_name && <FormErrorMessage>{formik.errors?.person1_name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="person1_birthday" mb="4">
            <FormLabel>Person 1 Birthday</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.person1_birthday ? new Date(formik.values?.person1_birthday) : null}
                onChange={(value: Date) => formik.setFieldValue('person1_birthday', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <FormControl id="person2_name" mb="4" isInvalid={!!formik.errors?.person2_name}>
            <FormLabel>Person 2 Name</FormLabel>
            <Input type="text" name="person2_name" value={formik.values?.person2_name} onChange={formik.handleChange} />
            {formik.errors.person2_name && <FormErrorMessage>{formik.errors?.person2_name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="person2_birthday" mb="4">
            <FormLabel>Person 2 Birthday</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.person2_birthday ? new Date(formik.values?.person2_birthday) : null}
                onChange={(value: Date) => formik.setFieldValue('person2_birthday', value)}
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
    entity: 'compatibility_report',
    operation: AccessOperationEnum.CREATE,
  }),
)(CompatibilityReportCreatePage);
