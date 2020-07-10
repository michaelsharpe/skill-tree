import React from 'react';
import {render} from '@testing-library/react';

import TalentTree from '../TalentTree';
import talentData from 'Data/talents.json';
import {normalizeSingleTree} from 'Helpers/normalizeData';

const singleTreeData = talentData[0];

const normalizedData = normalizeSingleTree(singleTreeData);

const names = Object.values(normalizedData.entities.talents).map(
  value => value.name,
);

describe('TalentTree', () => {
  it('displays the tree data', () => {
    const noop = () => {};

    const {queryByTestId} = render(
      <TalentTree loadTalents={noop} talentTree={singleTreeData} />,
    );

    names.map(name => {
      expect(queryByTestId(name)).not.toBeNull();
    });
  });
});
