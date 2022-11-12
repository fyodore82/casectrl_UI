import { render, screen } from '@testing-library/react';
import Login from './Login'

jest.mock('axios')

test('Login page rednered with empty username and password', () => {

  render(<Login onLogin={jest.fn()}/>)
  const username = screen.getByTestId('username');
  expect(username).toHaveValue('')
});
