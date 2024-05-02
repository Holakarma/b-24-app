import React from 'react';
import { DashboardSettings } from '../dashboard-settings/DashboardSettings';
import { DashboardOpen } from '../dashboard-open/DashboardOpen';
import { ShowDasboards } from '../show-dashboards/ShowDashboards';

export function DashboardField({ oldDashboards, setTitle }) {
    const [dashboards, setDashboards] = React.useState(oldDashboards);

    const [settings, settingsAppear] = React.useState();
    function toggleSettings() {
        settings ? settingsAppear(0) : settingsAppear(1);
        setTimeout(BX24.fitWindow, 10);
    }
    const [openedDashboard, setOpenedDashboard] = React.useState(undefined);

    return (
        <div className="mt-3">
            <div className="my-5">
                {openedDashboard ? (
                    <DashboardOpen
                        setTitle={setTitle}
                        setOpenedDashboard={setOpenedDashboard}
                        dashboard={openedDashboard}
                        setDashboards={setDashboards}
                    />
                ) : (
                    <ShowDasboards
                        dashboards={dashboards}
                        setOpenedDashboard={setOpenedDashboard}
                    />
                )}
            </div>
            {openedDashboard ? null : (
                <>
                    <button
                        onClick={toggleSettings}
                        className="btn btn-primary w-100 mb-4"
                    >
                        Добавить дашборд
                    </button>
                    <DashboardSettings
                        settings={settings}
                        dashboards={dashboards}
                        setDashboards={setDashboards}
                        toggleSettings={toggleSettings}
                        setOpenedDashboard={setOpenedDashboard}
                    />
                </>
            )}
        </div>
    );
}
