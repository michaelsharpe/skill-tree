import React from 'react';
import {render} from '@testing-library/react';

import ProgressBar from '../ProgressBar';

describe('progressBar', () => {
  it('renders two divs', () => {
    const {queryByTestId} = render(<ProgressBar />);

    expect(queryByTestId('outer')).not.toBeNull();
    expect(queryByTestId('inner')).not.toBeNull();
  });

  it('sets the width of the outer div', () => {
    const {queryByTestId} = render(<ProgressBar width="50" />);

    expect(queryByTestId('outer')).toHaveStyle('width: 50px');
  });

  it('sets the width of the inner div as a percentage of the outer', () => {
    const {queryByTestId} = render(<ProgressBar width="50" percentage="0.5" />);

    expect(queryByTestId('inner')).toHaveStyle('width: 25px');
  });
});
