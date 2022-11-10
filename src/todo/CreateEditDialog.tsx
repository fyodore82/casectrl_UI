import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Form, Formik, FormikHelpers } from 'formik'
import { FC, useCallback } from 'react'
import { ToDoItem } from './todoReducer'
import * as Yup from 'yup'
import Button from '@mui/material/Button'

type Props = {
  open: boolean
  onClose: () => void
  onSave: (value: ToDoItem) => Promise<void>
  toDoItem?: ToDoItem
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string(),
})

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
})

const CreateEditDialog: FC<Props> = ({
  open,
  onClose,
  onSave,
  toDoItem,
}) => {
  const handleSubmit = useCallback(async (values: ToDoItem, formikHelpers: FormikHelpers<ToDoItem>) => {
    try {
      await onSave(values)
    }
    catch {
      formikHelpers.setSubmitting(false)
    }
  }, [onSave])

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{toDoItem ? 'Edit To Do' : 'Create To Do'}</DialogTitle>
      <Formik<ToDoItem>
        initialValues={toDoItem || {
          id: -1,
          title: '',
          description: '',
          createdBy: '',
          createdAt: '',
          modifedOn: null,
          modifiedBy: null,
          accountId: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue, setFieldTouched, isSubmitting, errors }) => (
          <Form noValidate>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                value={values.title}
                label='Title'
                onChange={({ target: { value } }) => setFieldValue('title', value)}
                onBlur={() => setFieldTouched('title')}
                disabled={isSubmitting}
                sx={{ marginBottom: 1 }}
                helperText={errors.title || ' '}
                error={!!errors.title}
              />
              <TextField
                value={values.description}
                label='Description'
                onChange={({ target: { value } }) => setFieldValue('description', value)}
                onBlur={() => setFieldTouched('description')}
                disabled={isSubmitting}
                helperText={errors.description || ' '}
                error={!!errors.description}
              />
              <Typography>Created By: <b>{values.createdBy}</b></Typography>
              <Typography>Created At: <b>{values.createdAt && dateFormatter.format(new Date(values.createdAt))}</b></Typography>
              <Typography>Modified By: <b>{values.modifiedBy}</b></Typography>
              <Typography>Modified At: <b>{values.modifedOn && dateFormatter.format(new Date(values.modifedOn))}</b></Typography>
            </DialogContent>
            <DialogActions sx={{ padding: 2 }}>
              <Button onClick={onClose} disabled={isSubmitting}> Cancel</Button>
              <Button type='submit' disabled={isSubmitting} variant='contained'>{toDoItem ? 'Update' : 'Create'}</Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog >
  )
}

export default CreateEditDialog
