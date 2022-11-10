import { Button, TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { FC, useCallback } from 'react'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const validationSchema = Yup.object().shape({
  userName: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

type FormValues = {
  userName: string
  password: string
  repeatPassword: string
}

const SignIn: FC = () => {
  const navigate = useNavigate();
  const handleSubmit = useCallback(async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    try {
      await axios.post(`${process.env.REACT_APP_USER_API}/user`, values)
      navigate('/userCreated')
    }
    catch (e: any) {
      formikHelpers.setErrors({ userName: e.response?.data?.title || e.message })
      formikHelpers.setSubmitting(false)
    }
  }, [navigate])

  return (
    <Formik<FormValues>
      initialValues={{
        userName: '',
        password: '',
        repeatPassword: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values, setFieldValue, setFieldTouched, isSubmitting, errors }) => (
        <Box display='flex' alignItems='center' justifyContent='center' flex='1'>
          <Form noValidate>
            <Paper sx={{ display: 'flex', flexDirection: 'column', padding: 4 }}>
              <Typography sx={{ marginBottom: 1, textAlign: 'center' }}>ToDo App Sign Up</Typography>
              <TextField
                value={values.userName}
                label='User Name'
                onChange={({ target: { value } }) => setFieldValue('userName', value)}
                onBlur={() => setFieldTouched('userName')}
                disabled={isSubmitting}
                sx={{ marginBottom: 1 }}
                helperText={errors.userName || ' '}
                error={!!errors.userName}
                autoComplete="username"
              />
              <TextField
                value={values.password}
                label='Password'
                onChange={({ target: { value } }) => setFieldValue('password', value)}
                onBlur={() => setFieldTouched('password')}
                disabled={isSubmitting}
                sx={{ marginBottom: 1 }}
                helperText={errors.password || ' '}
                error={!!errors.password}
              />
              <TextField
                value={values.repeatPassword}
                label='Repeat password'
                onChange={({ target: { value } }) => setFieldValue('repeatPassword', value)}
                onBlur={() => setFieldTouched('repeatPassword')}
                disabled={isSubmitting}
                sx={{ marginBottom: 1 }}
                helperText={errors.repeatPassword || ' '}
                error={!!errors.repeatPassword}
              />
              <Box display='flex' justifyContent='end' mt={1}>
                <Button type='submit' disabled={isSubmitting}>
                  Sign Up
                </Button>
              </Box>
            </Paper>
          </Form>
        </Box>
      )}
    </Formik>
  )
}

export default SignIn
