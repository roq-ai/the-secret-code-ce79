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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getNumerologyReportById, updateNumerologyReportById } from 'apiSdk/numerology-reports';
import { Error } from 'components/error';
import { numerologyReportValidationSchema } from 'validationSchema/numerology-reports';
import { NumerologyReportInterface } from 'interfaces/numerology-report';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { CompanyInterface } from 'interfaces/company';
import { getCompanies } from 'apiSdk/companies';

function NumerologyReportEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<NumerologyReportInterface>(
    () => (id ? `/numerology-reports/${id}` : null),
    () => getNumerologyReportById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: NumerologyReportInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateNumerologyReportById(id, values);
      mutate(updated);
      resetForm();
      router.push('/numerology-reports');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<NumerologyReportInterface>({
    initialValues: data,
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
            Edit Numerology Report
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(NumerologyReportEditPage);
