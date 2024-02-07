import React from "react";
import { DashboardField } from "../dashboards-field/DashboardField";

export function Workspace({oldDashboards}) {
    return (
        <>
            <h1 className="text-center mt-2">Дэшборды</h1>
            <div className="container">
                <DashboardField oldDashboards={oldDashboards} />
            </div>
        </>
    )
}
