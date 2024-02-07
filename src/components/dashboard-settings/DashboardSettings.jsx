import React from "react";
import { AddDashBoardBtn } from "../addDashoard-btn/AddDashboardBtn";
import { AddParticipants } from "../addParticipants/AddParticipants";
import { useCreateConditions } from "../useCreateConditions/useCreateConditions";

export function DashboardSettings({
    settings,
    dashboards,
    setDashboards,
}) {
    if (!settings) return null;
    const {
        dashBoardTitle,
        setDashBoardTitle,
        status,
        setStatus,
        statusErr,
        participants,
        setParticipants,
    } = useCreateConditions();

    function changeListener(e) {
        setDashBoardTitle(e.target.value);
        setStatus("noErr");
    }

    return (
        <div className="card border-3 p-5 mb-4">
            <h3 className="mb-4">Настройка Дэшборда</h3>
            <div className="form-floating mb-4 z-0">
                <input
                    onChange={changeListener}
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Название дешборда"
                />
                <label htmlFor="floatingInput">Название дешборда</label>
            </div>
            <AddParticipants
                participants={participants}
                setParticipants={setParticipants}
            />
            <AddDashBoardBtn
                dashboards={dashboards}
                setDashboards={setDashboards}
                dashBoardTitle={dashBoardTitle}
                status={status}
                setStatus={setStatus}
                statusErr={statusErr}
                participants={participants}
            />
        </div>
    );
}
