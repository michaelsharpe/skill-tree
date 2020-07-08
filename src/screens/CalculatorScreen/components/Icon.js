import React from 'react';
import {shape, string, boolean} from 'prop-types';

import './icon.scss';

const Icon = ({icon}) => {
  const active = icon.active ? 'active' : 'inactive';
  return (
    <div
      data-testid={icon.name}
      cy-test={icon.name}
      className={`icon icon-${icon.name} ${active}`}
    ></div>
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
