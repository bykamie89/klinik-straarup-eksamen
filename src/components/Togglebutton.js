import React from 'react';
import './Togglebuttons.scss';

const ToggleButton = ({ label }) => {
  return (
    <div class='display'>
      <label class='label toggle'>
        <input type='checkbox' class='toggle_input' />
        <div class='toggle-control'></div>
      </label>
    </div>
  );
};

export default ToggleButton;
