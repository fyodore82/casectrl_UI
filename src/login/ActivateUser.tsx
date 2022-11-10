import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { FC, useEffect, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import LoopIcon from '@mui/icons-material/Loop';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const ActivateUser: FC = () => {
  const [isActivated, setIsActivated] = useState<boolean>()
  const [searchParams] = useSearchParams()
  const [error, setError] = useState<string>()

  useEffect(() => {
    if (isActivated !== undefined) return
    (async () => {
      setIsActivated(false)
      try {
        const code = searchParams.get('code')
        const userId = searchParams.get('userId')
        await axios.post(`${process.env.REACT_APP_USER_API}/confirmEmail`, { code, userId })
        setIsActivated(true)
      }
      catch (e: any) {
        setError(e.response?.data?.title || e.message)
      }
    })()
  }, [isActivated, searchParams])

  return (
    <Box display='flex' alignItems='center' justifyContent='center' flex='1'>
      <Paper sx={{ display: 'flex', flexDirection: 'column', padding: 4, alignItems: 'center' }}>
        {!isActivated ? (
          <>
            <LoopIcon sx={{ fontSize: 80 }} htmlColor='green' />
            {!error && <Typography sx={{ marginBottom: 1, textAlign: 'center' }}>Activating your account...</Typography>}
            {error && <Typography sx={{ marginBottom: 1, textAlign: 'center' }}>Activation failed {error}</Typography>}
          </>
        ) : (
          <>
            <CheckIcon sx={{ fontSize: 80 }} htmlColor='green' />
            <Typography sx={{ marginBottom: 1, textAlign: 'center' }}>User Sucessfully Activated. You may login now</Typography>
          </>
        )}
      </Paper>
    </Box>
  )
}

export default ActivateUser
