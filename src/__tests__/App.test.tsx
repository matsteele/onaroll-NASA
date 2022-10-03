import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


// test("Should display loading message and disappear when posts arrive", async () => {
//   render(<App />);
//   await waitForElementToBeRemoved(() => screen.getByText("A moment please..."));
// });

// //