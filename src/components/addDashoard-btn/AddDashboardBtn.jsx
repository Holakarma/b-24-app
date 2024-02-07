import React from "react";

export function AddDashBoardBtn({
    dashboards,
    setDashboards,
    dashBoardTitle,
    status,
    setStatus,
    statusErr,
    participants,
}) {

    function createDashboard() {
        const strParticipants = participants.join(",");
        BX24.callMethod(
            "entity.item.add",
            {
                ENTITY: "dashboards",
                NAME: "dashboard-item",
                PROPERTY_VALUES: {
                    DASHBOARD_TITLE: dashBoardTitle,
                    PARTICIPANTS_LIST: strParticipants,
                },
            },
            function () {
                BX24.callMethod(
                    "entity.item.get",
                    { ENTITY: "dashboards" },
                    function (result) {
                        setDashboards(result.data());
                    },
                );
            },
        );
    }

    function validateDashboard() {
        if (!dashBoardTitle) {
            setStatus("emptyField");
        } else if (
            dashboards.find(
                (dashboard) =>
                    dashboard.PROPERTY_VALUES.DASHBOARD_TITLE == dashBoardTitle,
            )
        ) {
            setStatus("sameName");
        } else {
            setStatus("noErr");
            createDashboard();
        }
    }
    function reColorBtn() {
        switch (status) {
            case "noErr":
                return "btn-success";
            case "emptyField":
            case "sameName":
                return "border-danger text-danger";
        }
    }
    function showAlert() {
        setTimeout(BX24.fitWindow, 10);
        return <p className="text-danger p-1">{statusErr[status]}</p>;
    }
    return (
        <>
            {showAlert()}
            <button
                onClick={validateDashboard}
                type="button"
                className={`btn ${reColorBtn()}`}
            >
                Создать
            </button>
        </>
    );
}