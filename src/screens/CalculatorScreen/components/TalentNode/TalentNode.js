import React from 'react';
import Icon from '../Icon';

import './talentNode.scss';

const TalentNode = ({talent, updateTalent, parent, counter}) => {
  const icon = {
    name: talent.icon,
  };

  const {unlocked} = talent;

  const unlockTalent = () => {
    updateTalent(talent, {unlocked: true});
  };

  const lockTalent = () => {
    updateTalent(talent, {unlocked: false});
  };

  const parentLocked = !!parent && !parent.unlocked;

  const childLocked =
    !!talent.children &&
    !!talent.children.length &&
    talent.children[0].unlocked;

  const counterFull = counter.current >= counter.total;

  const onClick = event => {
    if (!parentLocked && !counterFull && !unlocked) {
      unlockTalent();
    }

    if (!childLocked && !parentLocked && unlocked) {
      lockTalent();
    }
  };

  return (
    <>
      <div
        className="talent"
        data-testid={`talent-${talent.icon}`}
        onClick={onClick}
      >
        <Icon icon={icon} active={unlocked} />
      </div>
      {!!talent.children &&
        talent.children.map((child, i) => (
          <TalentNode
            key={i}
            talent={child}
            updateTalent={updateTalent}
            parent={talent}
            counter={counter}
          />
        ))}
    </>
  );
};

TalentNode.defaultProps = {
  counter: {
    current: 0,
    total: 6,
  },
};

export default TalentNode;
