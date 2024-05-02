import React from "react";
import { DashboardField } from "../dashboards-field/DashboardField";


export function Workspace({oldDashboards}) {
    const [title, setTitle] = React.useState('Дашборды')
    BX24.setTitle("Дашборды");
    return (
        <>
            <h1 className="text-center mt-2 display-4">{title}</h1>
            <div className="container">
                <DashboardField oldDashboards={oldDashboards} setTitle={setTitle} />
            </div>
        </>
    )
}
