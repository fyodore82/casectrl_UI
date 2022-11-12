import { Button, TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { FC, useCallback } from 'react'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const validationSchema = Yup.object().shape({
  userName: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
})

type FormValues = {
  userName: string
  password: string
}

type Props = {
  onLogin: () => void
}

const Login: FC<Props> = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    try {
      const { data: { token } } = await axios.post<{ token: string }>(`${process.env.REACT_APP_USER_API}/login`, values)
      axios.interceptors.request.use((config) => {
        if (!config.headers) config.headers = {}
        config.headers.Authorization = `Bearer ${token}`
        return config
      })
      onLogin()
    }
    catch (e: any) {
      formikHelpers.setErrors({ password: e.response?.data?.title || e.message })
      formikHelpers.setSubmitting(false)
    }
  }, [onLogin])

  return (
    <Formik<FormValues>
      initialValues={{
        userName: '',
        password: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values, setFieldValue, setFieldTouched, isSubmitting, errors }) => (
        <Box display='flex' alignItems='center' justifyContent='center' flex='1'>
          <Form noValidate>
            <Paper sx={{ display: 'flex', flexDirection: 'column', padding: 4 }}>
              <Typography sx={{ marginBottom: 1, textAlign: 'center' }}>ToDo App Login</Typography>
              <TextField
                value={values.userName}
                label='User Name'
                onChange={({ target: { value } }) => setFieldValue('userName', value)}
                onBlur={() => setFieldTouched('userName')}
                disabled={isSubmitting}
                sx={{ marginBottom: 1 }}
                helperText={errors.userName || ' '}
                error={!!errors.userName}
                autoComplete='username'
                inputProps={{
                  'data-e2e': 'username',
                }}
              />
              <TextField
                value={values.password}
                type='password'
                autoComplete='new-password'
                label='Password'
                onChange={({ target: { value } }) => setFieldValue('password', value)}
                onBlur={() => setFieldTouched('password')}
                disabled={isSubmitting}
                helperText={errors.password || ' '}
                error={!!errors.password}
                inputProps={{
                  'data-e2e': 'password',
                }}
                FormHelperTextProps={{
                  'data-e2e': 'passwordHelperText'
                } as any}
              />
              <Box display='flex' justifyContent='end' mt={1}>
                <Button data-e2e='signUp' onClick={() => navigate("/signup")} disabled={isSubmitting} sx={{ marginRight: 1 }}>
                  Sign Up
                </Button>
                <Button data-e2e='signIn' type='submit' disabled={isSubmitting} variant='contained'>
                  Sign In
                </Button>
              </Box>
            </Paper>
          </Form>
        </Box>
      )}
    </Formik>
  )
}

export default Login
