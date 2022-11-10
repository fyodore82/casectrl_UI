import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { FC } from 'react'
import CheckIcon from '@mui/icons-material/Check';

const UserCreated: FC = () => (
  <Box display='flex' alignItems='center' justifyContent='center' flex='1'>
    <Paper sx={{ display: 'flex', flexDirection: 'column', padding: 4, alignItems: 'center' }}>
      <CheckIcon sx={{ fontSize: 80 }} htmlColor='green' />
      <Typography sx={{ marginBottom: 1, textAlign: 'center' }}>User Sucessfully Created</Typography>
      <Typography sx={{ marginBottom: 1, textAlign: 'center' }}>Please check your email for verification link</Typography>
    </Paper>
  </Box>
)

export default UserCreated
