import React, { useEffect } from "react";
import { Dashboard } from "../dashboard/Dashboard";
import { DashboardSettings } from "../dashboard-settings/DashboardSettings";
import { DashboardOpen } from "../dashboard-open/DashboardOpen";

export function DashboardField({ oldDashboards }) {
    const [dashboards, setDashboards] = React.useState(oldDashboards);

    const [settings, settingsAppear] = React.useState();
    function toggleSettings() {
        settings ? settingsAppear(0) : settingsAppear(1);
        setTimeout(BX24.fitWindow, 10);
    }

    const [openedDashboard, setOpenedDashboard] = React.useState(undefined);

    return (
        <div className="mt-5">
            <div className="row row-cols-auto gap-1 g-0 my-5">
                {openedDashboard ? (
                    <DashboardOpen
                        setOpenedDashboard={setOpenedDashboard}
                        dashboard={openedDashboard}
                        setDashboards={setDashboards}
                    />
                ) : (
                    dashboards.map((dashboard) => {
                        return (
                            <Dashboard
                                setOpenedDashboard={setOpenedDashboard}
                                key={dashboard.ID}
                                dashboard={dashboard}
                                setDashboards={setDashboards}
                            />
                        );
                    })
                )}
            </div>
            {openedDashboard ? null : (
                <>
                    <button
                        onClick={toggleSettings}
                        className="btn btn-primary w-100 mb-4">
                        Добавить дэшборд
                    </button>
                    <DashboardSettings
                        settings={settings}
                        dashboards={dashboards}
                        setDashboards={setDashboards}
                    />
                </>
            )}
        </div>
    );
}
