import React from 'react';
import {render} from '@testing-library/react';

import {TalentTreeGroup} from '../TalentTreeGroup/TalentTreeGroup';

import talentData from 'Data/talents.json';
import {normalizeTreeData} from 'Helpers/normalizeData';

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

    const {queryByTestId} = render(
      <TalentTreeGroup loadTalentTrees={noop} talentTrees={talentData} />,
    );

    names.forEach(name => {
      expect(queryByTestId(name)).not.toBeNull();
    });
  });
});
