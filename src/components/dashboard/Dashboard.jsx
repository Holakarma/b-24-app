import React from "react";
import styles from "./dashboard-style.module.css";

export function Dashboard({ setOpenedDashboard, dashboard, setDashboards }) {
    function openDashboardHandler() {
        setOpenedDashboard(dashboard);
        setTimeout(BX24.fitWindow, 10);
    }
    return (
        <div
            onClick={openDashboardHandler}
            className={`card ${styles.dashboardCard} p-4`}>
            <h5>{dashboard.PROPERTY_VALUES.DASHBOARD_TITLE}</h5>
            <div>id: {dashboard.ID}</div>
        </div>
    );
}
