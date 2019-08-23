import React from 'react';

const Display = (props) => (
  props.if ? <React.Fragment>{props.children}</React.Fragment> : null
);

export default Display;
