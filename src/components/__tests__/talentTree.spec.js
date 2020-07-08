import React from 'react';
import {render} from '@testing-library/react';

import TalentTree from '../TalentTree';
import talentData from '../../data/talents.json';
import {normalizeSingleTree} from '../../helpers/normalizeData';

const singleTreeData = talentData[0];

const normalizedData = normalizeSingleTree(singleTreeData);

const names = Object.entries(normalizedData.entities.talents).map(
  ([key, value]) => value.name,
);

describe('TalentTree', () => {
  it('displays the tree data', () => {
    const noop = () => {};

    const {queryByText} = render(
      <TalentTree loadTalents={noop} talentTree={singleTreeData} />,
    );

    names.map(name => {
      expect(queryByText(name)).not.toBeNull();
    });
  });
});
