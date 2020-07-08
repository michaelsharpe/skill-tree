import React from 'react';

const TalentNode = ({talent}) => {
  return (
    <>
      <p>{talent.name}</p>
      {!!talent.children &&
        talent.children.map((child, i) => (
          <TalentNode key={i} talent={child} />
        ))}
    </>
  );
};

export default TalentNode;
