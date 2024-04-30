import React from "react";
import { Dashboard } from "../dashboard/Dashboard";

export function ShowDasboards({ dashboards, setOpenedDashboard }) {
    const [isUsersLoaded, setUsersLoaded] = React.useState(false);
    let countUsersLoaded = 0;
    return (
        <div>
            {dashboards.map((dashboard) => {
                return (
                    <Dashboard
                        key={dashboard.ID}
                        setOpenedDashboard={setOpenedDashboard}
                        dashboard={dashboard}
                        loadUser={() => {
                            countUsersLoaded++;
                            if (countUsersLoaded === dashboards.length) {
                                setUsersLoaded(true);
                            }
                        }}
                        isUsersLoaded={isUsersLoaded}
                    />
                );
            })}
        </div>
    );
}
