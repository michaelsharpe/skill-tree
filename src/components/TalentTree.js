import React from 'react';

import TalentNode from './TalentNode';

const TalentTree = ({talentTree}) => {
  return (
    <>
      <div>{talentTree.name}</div>
      {!!talentTree.talents &&
        talentTree.talents.map((talent, i) => (
          <TalentNode talent={talent} key={talent.id} />
        ))}
    </>
  );
};

export default TalentTree;
