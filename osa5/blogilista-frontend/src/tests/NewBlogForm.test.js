import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NewBlogForm from '../components/NewBlogForm';

describe('renders content', () => {
  test('event handler has right information', async () => {
    const createBlog = jest.fn();

    render(<NewBlogForm createBlog={createBlog} />);

    const input = screen.getByPlaceholderText('title', 'author', 'url');
    await userEvent.type(input, 'testing form fields');

    const sendButton = screen.getByText('Create');
    userEvent.click(sendButton);

    expect(createBlog.mock.calls[0][0].title).toBe('testing form fields');
  });
});
