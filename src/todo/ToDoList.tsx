import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { FC, useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { fetchToDoList, deleteToDoItem, ToDoItem, updateToDoItem, createToDoItem } from './todoReducer'
import CreateEditDialog from './CreateEditDialog'
import Button from '@mui/material/Button'

type Props = {
  onLogout: () => void
}

const ToDoList: FC<Props> = ({ onLogout }) => {
  const { toDoList, isLoading } = useSelector((state: RootState) => state.todo)
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchToDoList())
  }, [dispatch])

  const [dialogProps, setDialogProps] = useState<{
    open: boolean
    toDoItem?: ToDoItem
  }>({ open: false })

  const handleSave = useCallback(async (updatedToDoItem: ToDoItem) => {
    try {
      if (dialogProps.toDoItem) await dispatch(updateToDoItem(updatedToDoItem))
      else await dispatch(createToDoItem(updatedToDoItem))
      setDialogProps({ open: false })
    }
    catch { }
  }, [dialogProps.toDoItem, dispatch])

  return (
    <>
      <Box display='flex' alignItems='center' flex={1} p={1} flexDirection='column' data-e2e='toDoListForm'>
        <Button variant='contained' sx={{ marginLeft: 'auto' }} onClick={onLogout}>Log Out</Button>
        {isLoading && (
          <Box display='flex' alignItems='center' justifyContent='center' flex={1}>
            <Typography data-testid='fetchingToDoList'>Fetching To Do list</Typography>
          </Box>
        )}
        {!isLoading && (
          <Box display='flex' flexDirection='column' sx={{ width: '60%' }} data-testid='toDoListContainer'>
            <Typography variant='h5' sx={{ textAlign: 'center', marginBottom: 1 }}>ToDo list</Typography>
            <Button
              data-testid='newToDoItemButton'
              variant='contained'
              onClick={() => setDialogProps({ open: true })}
              sx={{ marginBottom: 1 }}
            >
              New To Do Item
            </Button>
            {toDoList.length === 0 && (
              <Box display='flex' alignItems='center' justifyContent='center' flex={1}>
                <Typography data-testid='noToDoItems'>List does not contain To Do Items</Typography>
              </Box>
            )}
            {toDoList.length > 0 && (
              <List>
                {toDoList.map((toDoItem) => (
                  <ListItem
                    key={toDoItem.id}
                    sx={{ paddingRight: 10 }}
                    secondaryAction={
                      <>
                        <IconButton edge="end" aria-label="edit" onClick={() => { setDialogProps({ open: true, toDoItem }) }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => { dispatch(deleteToDoItem(toDoItem.id)) }}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemIcon>
                      <AssignmentTurnedInIcon />
                    </ListItemIcon>
                    <ListItemText
                      data-testid='listItemText'
                      primary={toDoItem.title}
                      secondary={toDoItem.description}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        )}
      </Box>
      <CreateEditDialog
        onClose={() => {
          setDialogProps({ open: false, toDoItem: undefined })
        }}
        onSave={handleSave}
        {...dialogProps}
      />
    </>

  )
}

export default ToDoList
