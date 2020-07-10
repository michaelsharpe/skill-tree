import React from 'react';
import {shape, string, boolean} from 'prop-types';

import './icon.scss';

const Icon = ({icon, active}) => {
  const isActive = active ? 'active' : 'inactive';
  return (
    <div className={`icon-box ${active ? 'active' : 'inactive'}`}>
      <div
        data-testid={icon.name}
        cy-test={icon.name}
        className={`icon icon-${icon.name} ${isActive}`}
      ></div>
    </div>
  );
};

Icon.propTypes = {
  icon: shape({
    name: string.required,
    active: boolean,
  }),
};

Icon.defaultProps = {
  active: false,
};

export default Icon;
