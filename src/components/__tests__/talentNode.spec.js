import React from 'react';
import {render} from '@testing-library/react';
import TalentNode from '../TalentNode';

describe('TalentNode', () => {
  it('renders the name of the talent', () => {
    const node = {
      name: 'berserker rage',
    };

    const {queryByText} = render(<TalentNode talent={node} />);

    expect(queryByText(node.name)).not.toBeNull();
  });

  it('renders the nodes children', () => {
    const node = {
      name: 'berserker rage',
      children: [{name: 'death blow'}, {name: 'insane fury'}],
    };

    const {queryByText} = render(<TalentNode talent={node} />);

    node.children.forEach(child => {
      expect(queryByText(child.name)).not.toBeNull();
    });
  });
});
