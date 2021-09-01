import React from 'react';
import './styleCabinetSearch.css';
import { InputSearch, SearchSystem } from '../index';

function CabinetSearch() {
  return (
    <div className="cabinet-search">

      <div className="cabinet-search-block">
        <div className="cabinet-search-field">

          <InputSearch />

          <SearchSystem />

        </div>

      </div>
    </div>
  );
}

export default React.memo(CabinetSearch);
