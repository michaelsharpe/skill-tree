import React from 'react';
import {render} from '@testing-library/react';

import Icon from './Icon';

describe('Icon', () => {
  const icon = {
    name: 'testing',
  };

  it('renders', () => {
    const {queryByTestId} = render(<Icon icon={icon} />);

    expect(queryByTestId(`${icon.name}`)).not.toBeNull();
  });

  it('has proper icon class', () => {
    const {getByTestId} = render(<Icon icon={icon} />);
    expect(getByTestId(`${icon.name}`)).toHaveClass(`icon-${icon.name}`);
  });

  it('has active class when active', () => {
    const {getByTestId} = render(<Icon active={true} icon={icon} />);
    expect(getByTestId(`${icon.name}`)).toHaveClass('active');
  });

  it('has inactive class when inactive', () => {
    const {getByTestId} = render(<Icon icon={icon} active={false} />);
    expect(getByTestId(`${icon.name}`)).toHaveClass('inactive');
  });

  it('render icon snapshots', () => {
    [
      'stack',
      'cutlery',
      'cake',
      'crown',
      'yacht',
      'snorkel',
      'lightning',
      'skulll',
    ].forEach(name => {
      const newIcon = {name};

      const context = render(<Icon icon={newIcon} />);
      expect(context).toMatchSnapshot();
    });
  });
});
