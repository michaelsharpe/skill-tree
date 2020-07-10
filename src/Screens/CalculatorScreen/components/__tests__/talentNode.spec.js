import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import TalentNode from '../TalentNode';

describe('TalentNode', () => {
  it('renders the icon of the talent', () => {
    const talent = {
      icon: 'berserker rage',
      children: [],
    };

    const {queryByTestId} = render(<TalentNode talent={talent} />);

    expect(queryByTestId(talent.icon)).not.toBeNull();
  });

  it('renders the nodes children', () => {
    const talent = {
      icon: 'berserker rage',
      children: [
        {icon: 'death blow', children: []},
        {icon: 'insane fury', children: []},
      ],
    };

    const {queryByTestId} = render(<TalentNode talent={talent} />);

    talent.children.forEach(child => {
      expect(queryByTestId(child.icon)).not.toBeNull();
    });
  });

  it('calls the updateTalent function on clicking the first unlocked talent', () => {
    const talent = {
      id: 1,
      icon: 'berserker-rage',
      unlocked: false,
      children: [],
    };

    const onClick = jest.fn().mockName('updateTalent');

    const {queryByTestId} = render(
      <TalentNode updateTalent={onClick} talent={talent} />,
    );

    fireEvent.click(queryByTestId(`talent-${talent.icon}`));
    expect(onClick).toHaveBeenCalledWith(talent, {unlocked: true});
  });

  it('prevents unlocking if parent is locked', () => {
    const talent = {
      id: 1,
      icon: 'metal-butterfly',
      unlocked: false,
      children: [{id: 2, icon: 'drunk-unicorn', unlocked: false, children: []}],
    };

    const onClick = jest.fn().mockName('updateTalent');

    const {queryByTestId} = render(
      <TalentNode updateTalent={onClick} talent={talent} />,
    );

    fireEvent.click(queryByTestId(`talent-${talent.children[0].icon}`));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('allows unlocking if parent is unlocked', () => {
    const talent = {
      id: 1,
      icon: 'metal-butterfly',
      unlocked: true,
      children: [{id: 2, icon: 'drunk-unicorn', unlocked: false, children: []}],
    };

    const onClick = jest.fn().mockName('updateTalent');

    const {queryByTestId} = render(
      <TalentNode updateTalent={onClick} talent={talent} />,
    );

    fireEvent.click(queryByTestId(`talent-${talent.children[0].icon}`));
    expect(onClick).toHaveBeenCalledWith(talent.children[0], {unlocked: true});
  });

  it('prevents unlocking if talent points are used up', () => {
    const talent = {
      id: 1,
      icon: 'metal-butterfly',
      unlocked: false,
      children: [{id: 2, icon: 'drunk-unicorn', unlocked: false, children: []}],
    };

    const onClick = jest.fn().mockName('updateTalent');

    const counter = {
      current: 6,
      total: 6,
    };

    const {queryByTestId} = render(
      <TalentNode updateTalent={onClick} talent={talent} counter={counter} />,
    );

    fireEvent.click(queryByTestId(`talent-${talent.children[0].icon}`));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('allows relocking even when points are used up', () => {
    const talent = {
      id: 1,
      icon: 'metal-butterfly',
      unlocked: true,
      children: [{id: 2, icon: 'drunk-unicorn', unlocked: true, children: []}],
    };

    const onClick = jest.fn().mockName('updateTalent');

    const counter = {
      current: 6,
      total: 6,
    };

    const {queryByTestId} = render(
      <TalentNode updateTalent={onClick} talent={talent} counter={counter} />,
    );

    fireEvent.click(queryByTestId(`talent-${talent.children[0].icon}`));
    expect(onClick).toHaveBeenCalledWith(talent.children[0], {
      unlocked: false,
    });
  });

  it('allows unlocking if there are talent points available', () => {
    const talent = {
      id: 1,
      icon: 'metal-butterfly',
      unlocked: false,
      children: [{id: 2, icon: 'drunk-unicorn', unlocked: false, children: []}],
    };

    const onClick = jest.fn().mockName('updateTalent');

    const counter = {
      current: 4,
      total: 6,
    };

    const {queryByTestId} = render(
      <TalentNode updateTalent={onClick} talent={talent} counter={counter} />,
    );

    fireEvent.click(queryByTestId(`talent-${talent.children[0].icon}`));
    expect(onClick).not.toHaveBeenCalledWith(talent.children[0], {
      unlocked: true,
    });
  });

  it('prevents relocking a talent whose child is unlocked', () => {
    const talent = {
      id: 1,
      icon: 'metal-butterfly',
      unlocked: true,
      children: [{id: 2, icon: 'drunk-unicorn', unlocked: true, children: []}],
    };

    const onClick = jest.fn().mockName('updateTalent');

    const counter = {
      current: 4,
      total: 6,
    };

    const {queryByTestId} = render(
      <TalentNode updateTalent={onClick} talent={talent} counter={counter} />,
    );

    fireEvent.click(queryByTestId(`talent-${talent.icon}`));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('render a progres bar if it has children', () => {
    const talent = {
      id: 1,
      icon: 'metal-butterfly',
      unlocked: true,
      children: [{id: 2, icon: 'drunk-unicorn', unlocked: true, children: []}],
    };

    const noop = () => {};

    const {queryByTestId} = render(
      <TalentNode updateTalent={noop} talent={talent} />,
    );

    expect(queryByTestId('progress')).not.toBeNull();
  });

  it("render doesn't a progres bar if it has no children", () => {
    const talent = {
      id: 1,
      icon: 'metal-butterfly',
      unlocked: true,
      children: [],
    };

    const noop = () => {};

    const {queryByTestId} = render(
      <TalentNode updateTalent={noop} talent={talent} />,
    );

    expect(queryByTestId('progress')).toBeNull();
  });
});
