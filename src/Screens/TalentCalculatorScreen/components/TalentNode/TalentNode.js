import React from 'react';
import Icon from '../Icon';

import './talentNode.scss';
import ProgressBar from '../ProgressBar';

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

  const onLeftClick = event => {
    if (!parentLocked && !counterFull && !unlocked) {
      unlockTalent();
    }
  };

  const onRightClick = event => {
    event.preventDefault();
    if (!childLocked && !parentLocked && unlocked) {
      lockTalent();
    }
  };

  return (
    <>
      <div
        className="talent"
        data-testid={`talent-${talent.icon}`}
        onClick={onLeftClick}
        onContextMenu={onRightClick}
        onDoubleClick={onRightClick}
      >
        <div className={`icon-box ${unlocked ? 'active' : 'inactive'}`}>
          <Icon icon={icon} active={unlocked} />
        </div>
      </div>

      {!!talent.children.length && (
        <div className="progress-container" data-testid="progress">
          <ProgressBar width="100" percentage={!childLocked ? '0' : '1'} />
        </div>
      )}

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
