import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ToDoList from './ToDoList';
import { useSelector, useDispatch } from 'react-redux'
import { ToDoItem } from './todoReducer';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

jest.mock('./CreateEditDialog', () => function CreateEditDialogMock ({ open }: { open: boolean }) {
  return open ? <div data-testid='createEditDialogMock'>CreateEditDialog</div> : null
})

beforeEach(() => {
  (useDispatch as any).mockReturnValue(jest.fn())
})
test('Should show loader when isLoading is true', () => {
  (useSelector as any).mockReturnValue({ toDoList: [], isLoading: true });
  render(<ToDoList onLogout={jest.fn()} />);
  const fetchingToDoList = screen.getByTestId('fetchingToDoList');
  const toDoListContainer = screen.queryByTestId('toDoListContainer')
  expect(fetchingToDoList).toBeInTheDocument();
  expect(toDoListContainer).toBeFalsy();
});

test('Should show List does not contain To Do Items when ToDoList is empty array', () => {
  (useSelector as any).mockReturnValue({ toDoList: [], isLoading: false });
  render(<ToDoList onLogout={jest.fn()} />);
  const noToDoItems = screen.queryByTestId('noToDoItems')
  expect(noToDoItems).toBeInTheDocument();
});

test('Should show To Do items from toDoItems array', () => {
  const toDoList: ToDoItem[] = [{
    id: 1,
    title: 'Title 1',
    description: 'Description 1',
    createdAt: '',
    createdBy: '',
    modifiedBy: '',
    modifedOn: '',
    accountId: '',
  }, {
    id: 2,
    title: 'Title 2',
    description: 'Description 2',
    createdAt: '',
    createdBy: '',
    modifiedBy: '',
    modifedOn: '',
    accountId: '',
  }];
  (useSelector as any).mockReturnValue({ toDoList, isLoading: false });
  render(<ToDoList onLogout={jest.fn()} />);
  const listItemText = screen.queryAllByTestId('listItemText')
  expect(listItemText).toHaveLength(toDoList.length)
  expect(listItemText[0]).toHaveTextContent(toDoList[0].title)
  expect(listItemText[0]).toHaveTextContent(toDoList[0].description || '')
  expect(listItemText[1]).toHaveTextContent(toDoList[1].title)
  expect(listItemText[1]).toHaveTextContent(toDoList[1].description || '')
});

test('Should open Crete New Item dialog when New ToDo Item Button is clicked', async () => {
  (useSelector as any).mockReturnValue({ toDoList: [], isLoading: false });
  render(<ToDoList onLogout={jest.fn()} />);
  // Make sure that CreateEditDialog is not open
  expect(screen.queryByTestId('createEditDialogMock')).toBeFalsy();
  // Click on button and await dialog
  const newToDoItemButton = screen.getByTestId('newToDoItemButton')
  fireEvent.click(newToDoItemButton)
  await waitFor(() => screen.findByTestId('createEditDialogMock'))
})
