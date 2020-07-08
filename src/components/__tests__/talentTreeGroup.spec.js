import React from 'react';
import {render} from '@testing-library/react';

import {TalentTreeGroup} from './../TalentTreeGroup';

import talentData from '../../data/talents.json';
import {normalizeTreeData} from '../../helpers/normalizeData';

const normalizedData = normalizeTreeData(talentData);

const names = Object.entries(normalizedData.entities.talents).map(
  ([key, value]) => value.name,
);

describe('TalentTreeGroup', () => {
  it('loads the tree data when it renders', () => {
    const loadTalentTrees = jest.fn().mockName('loadTalentTrees');

    render(
      <TalentTreeGroup loadTalentTrees={loadTalentTrees} talentTrees={[]} />,
    );

    expect(loadTalentTrees).toHaveBeenCalled();
  });

  it('should render all talent trees', () => {
    const noop = () => {};

    const {queryByText} = render(
      <TalentTreeGroup loadTalentTrees={noop} talentTrees={talentData} />,
    );

    names.forEach(name => {
      expect(queryByText(name)).not.toBeNull();
    });
  });
});
