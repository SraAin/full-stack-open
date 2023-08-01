import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import Blog from '../components/Blog';

describe('renders content', () => {
  const blog = {
    title: 'How to workout at home',
    author: 'Richard Dell',
    url: 'Link to blog',
    likes: 13
  };

  test('render title and author', () => {
    render(<Blog blog={blog} />);

    const element = screen.getAllByText('How to workout at home BY Richard Dell');
    expect(element).toBeDefined();
  });
});
