import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';

function Search({ type, value, onChange }) {
  return (
    <div>
      <input type={type} value={value} onChange={onChange} className="form-control mb-3" />
    </div>
  );
}

Search.defaultProps = { type: 'text', value: '' };

export default Search;
