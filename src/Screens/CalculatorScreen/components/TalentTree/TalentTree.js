import React from 'react';

import './talentTree.scss';

import TalentNode from '../TalentNode';

const TalentTree = ({talentTree, updateTalent, counter}) => {
  return (
    <div className="talent-tree">
      <div className="tree-name">
        <p>{talentTree.name.toUpperCase()}</p>
      </div>
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
