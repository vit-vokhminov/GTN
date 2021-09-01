import React from 'react';
import { useSelector } from 'react-redux';
import { Select } from '../index';

function CabinetSettings() {
  const { dataEngines } = useSelector(({ filter }) => filter);

  return (
    <div className="cabinet-settings">
      <div className="cabinet-settings__title">Параметры по умолчанию</div>
      <div className="cabinet-settings-block">
        <div className="select-block select-block_small">
          <div className="select-block__title">Поисковая система</div>
          <div className="select-block-content">

            <Select option={dataEngines.engines} only="icon" dataKey="select-block-content" />

          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(CabinetSettings);
