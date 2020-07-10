import React, {useState, useEffect} from 'react';

import './progressBar.scss';

const ProgressBar = ({width, percentage}) => {
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(width * percentage);
  }, [width, percentage]);

  return (
    <div
      className="progress-bar"
      data-testid="outer"
      style={{width: `${width}px`}}
    >
      <div
        data-testid="inner"
        className="progress"
        style={{width: `${value}px`}}
      ></div>
    </div>
  );
};

export default ProgressBar;
