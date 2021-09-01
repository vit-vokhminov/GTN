import React from 'react';
import './styleCabinetSidebar.css';
import classNames from 'classnames';
import CabinetSettings from './CabinetSettings';
import CabinetProfile from './CabinetProfile';

function CabinetSidebar() {
  const [sidebarView, setSidebarView] = React.useState(false);

  function visibleSidebar() {
    setSidebarView(!sidebarView);
  }

  return (

    <div className={classNames('cabinet-sidebar', { hidden: sidebarView })}>
      <div className="cabinet-sidebar__toggle" onClick={visibleSidebar} />
      <div className="cabinet-sidebar-body">

        <CabinetProfile />

        <CabinetSettings />

      </div>
    </div>

  );
}

export default React.memo(CabinetSidebar);
