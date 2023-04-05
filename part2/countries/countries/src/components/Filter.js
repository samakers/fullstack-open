import React from 'react';

const Filter = ({ value, onChange }) => {
    return (
      <div>
        <label>find countries</label>
        <input value={value} onChange={onChange}></input>
      </div>
    );
  }

  export default Filter
