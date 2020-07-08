import React from 'react';
import Icon from './Icon';

import './talentNode.scss';

const TalentNode = ({talent}) => {
  const icon = {
    name: talent.icon,
  };

  return (
    <>
      <div className="talent">
        <Icon icon={icon} />
      </div>
      {!!talent.children &&
        talent.children.map((child, i) => (
          <TalentNode key={i} talent={child} />
        ))}
    </>
  );
};

export default TalentNode;
