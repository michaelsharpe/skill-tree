import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import TalentNode from './TalentNode';

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

  describe('unlocking talents', () => {
    it('calls the updateTalent function on clicking the first locked talent', () => {
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

    it('allows unlocking if parent is unlocked', () => {
      const talent = {
        id: 1,
        icon: 'metal-butterfly',
        unlocked: true,
        children: [
          {id: 2, icon: 'drunk-unicorn', unlocked: false, children: []},
        ],
      };

      const onClick = jest.fn().mockName('updateTalent');

      const {queryByTestId} = render(
        <TalentNode updateTalent={onClick} talent={talent} />,
      );

      fireEvent.click(queryByTestId(`talent-${talent.children[0].icon}`));
      expect(onClick).toHaveBeenCalledWith(talent.children[0], {
        unlocked: true,
      });
    });

    it('allows unlocking if there are talent points available', () => {
      const talent = {
        id: 1,
        icon: 'metal-butterfly',
        unlocked: false,
        children: [
          {id: 2, icon: 'drunk-unicorn', unlocked: false, children: []},
        ],
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

    it('prevents unlocking if parent is locked', () => {
      const talent = {
        id: 1,
        icon: 'metal-butterfly',
        unlocked: false,
        children: [
          {id: 2, icon: 'drunk-unicorn', unlocked: false, children: []},
        ],
      };

      const onClick = jest.fn().mockName('updateTalent');

      const {queryByTestId} = render(
        <TalentNode updateTalent={onClick} talent={talent} />,
      );

      fireEvent.click(queryByTestId(`talent-${talent.children[0].icon}`));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('prevents unlocking if talent points are used up', () => {
      const talent = {
        id: 1,
        icon: 'metal-butterfly',
        unlocked: false,
        children: [
          {id: 2, icon: 'drunk-unicorn', unlocked: false, children: []},
        ],
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
  });

  // Currently right mouse click events are not triggering reacts onContextMenu.
  // Bug filed: https://github.com/testing-library/react-testing-library/issues/742
  describe('locking', () => {
    let queryByTestId;
    let talent;
    let onClick;

    const counterDefault = {
      current: 2,
      total: 6,
    };

    const defaultTalent = {
      id: 1,
      icon: 'metal-butterfly',
      unlocked: true,
      children: [{id: 2, icon: 'drunk-unicorn', unlocked: false, children: []}],
    };

    const setup = (counter = counterDefault, setupTalent = defaultTalent) => {
      talent = setupTalent;
      onClick = jest.fn().mockName('updateTalent');

      const context = render(
        <TalentNode updateTalent={onClick} talent={talent} counter={counter} />,
      );

      queryByTestId = context.queryByTestId;
    };

    describe('double click', () => {
      it('locks a skill when double clicked', () => {
        setup();

        fireEvent.dblClick(queryByTestId(`talent-${talent.icon}`));

        expect(onClick).toHaveBeenCalledWith(talent, {
          unlocked: false,
        });
      });
    });

    describe.skip('right click', () => {
      it('locks a talent when the right mouse button is clicked', async () => {
        setup();
        fireEvent.click(queryByTestId(`talent-${talent.icon}`), {
          button: 2,
        });

        expect(onClick).toHaveBeenCalledWith(talent, {
          unlocked: false,
        });
      });

      it('allows locking even when points are used up', () => {
        const counter = {
          current: 6,
          total: 6,
        };

        setup(counter);

        fireEvent.click(queryByTestId(`talent-${talent.children[0].icon}`), {
          button: 2,
        });
        expect(onClick).toHaveBeenCalledWith(talent.children[0], {
          unlocked: false,
        });
      });

      it('prevents locking a talent whose child is unlocked', () => {
        const talent = {
          id: 1,
          icon: 'metal-butterfly',
          unlocked: true,
          children: [
            {id: 2, icon: 'drunk-unicorn', unlocked: true, children: []},
          ],
        };

        setup(undefined, talent);

        fireEvent.click(queryByTestId(`talent-${talent.icon}`));
        expect(onClick).not.toHaveBeenCalled();
      });
    });
  });

  describe('progress bar', () => {
    it('render a progres bar if it has children', () => {
      const talent = {
        id: 1,
        icon: 'metal-butterfly',
        unlocked: true,
        children: [
          {id: 2, icon: 'drunk-unicorn', unlocked: true, children: []},
        ],
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
});
