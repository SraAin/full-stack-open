import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Blog from '../components/Blog';

describe('renders content', () => {
  const blog = {
    title: 'How to workout at home',
    author: 'Richard Dell',
    url: 'Link to blog',
    likes: 13,
    user: 'Samu Heli'
  };

  test('render title and author', () => {
    render(<Blog blog={blog} />);

    const element = screen.getAllByText(
      'How to workout at home BY Richard Dell'
    );
    expect(element).toBeDefined();
  });

  test('render url and likes when view button has been pressed', async () => {
    render(<Blog blog={blog} />);

    const button = screen.getByText('View');
    await userEvent.click(button);

    const link = screen.getByText('Link to blog');
    expect(link).toBeDefined();

    const url = screen.getByText('Likes: 13');
    expect(url).toBeDefined();
  });

  test('render event handler twice when like button has been pressed twice', async () => {
    const mockHandler = jest.fn();

    render(<Blog blog={blog} handleBlogUpdate={mockHandler} />);

    const button = screen.getByText('Like');
    await userEvent.click(button);
    await userEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
