import React from 'react';

import TalentNode from './TalentNode';

const TalentTree = ({talentTree, updateTalent, counter}) => {
  return (
    <div className="talent-tree">
      <p>{talentTree.name}</p>
      {!!talentTree.talents &&
        talentTree.talents.map((talent, i) => (
          <TalentNode
            talent={talent}
            key={talent.id}
            updateTalent={updateTalent}
            counter={counter}
          />
        ))}
    </div>
  );
};

export default TalentTree;
