import React from 'react';
import {render} from '@testing-library/react';
import TalentNode from '../TalentNode';

describe('TalentNode', () => {
  it('renders the icon of the talent', () => {
    const talent = {
      icon: 'berserker rage',
    };

    const {queryByTestId} = render(<TalentNode talent={talent} />);

    expect(queryByTestId(talent.icon)).not.toBeNull();
  });

  it('renders the nodes children', () => {
    const talent = {
      icon: 'berserker rage',
      children: [{icon: 'death blow'}, {icon: 'insane fury'}],
    };

    const {queryByTestId} = render(<TalentNode talent={talent} />);

    talent.children.forEach(child => {
      expect(queryByTestId(child.icon)).not.toBeNull();
    });
  });
});
