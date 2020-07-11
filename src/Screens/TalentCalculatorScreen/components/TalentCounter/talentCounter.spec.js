import React from 'react';
import {render} from '@testing-library/react';

import {TalentCounter} from './TalentCounter';

describe('TalentCounter', () => {
  it('renders', () => {
    const {queryByText} = render(<TalentCounter />);

    expect(queryByText('Points Spent')).not.toBeNull();
  });

  it('renders starting points and total points', () => {
    const current = 0;
    const total = 6;

    const {queryByText} = render(
      <TalentCounter current={current} total={total} />,
    );

    expect(queryByText(current.toString())).not.toBeNull();
    expect(queryByText(total.toString())).not.toBeNull();
  });
});
