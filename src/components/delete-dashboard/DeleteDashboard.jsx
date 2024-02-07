import React from "react";

export function DeleteDashboard({
    dashboard,
    setDashboards,
    setOpenedDashboard,
}) {
    const [showconfirmation, setConfirmation] = React.useState(false);

    function deleteHandler() {
        BX24.callMethod(
            "entity.item.delete",
            {
                ENTITY: "dashboards",
                ID: dashboard.ID,
            },
            function (result) {
                BX24.callMethod(
                    "entity.item.get",
                    { ENTITY: "dashboards" },
                    function (result) {
                        setDashboards(result.data());
                    },
                );
                setOpenedDashboard(undefined);
                setTimeout(BX24.fitWindow, 10);
            },
        );
    }
    return (
        <div className="mt-3">
            {showconfirmation ? (
                <div className="row row-cols-auto align-items-center g-0 gap-2">
                    <p className="col mb-0">Вы уверены?</p>
                    <button
                        className="btn btn-success col"
                        onClick={deleteHandler}>
                        Да
                    </button>
                    <button
                        className="btn btn-danger col"
                        onClick={() => setConfirmation(false)}>
                        Отмена
                    </button>
                </div>
            ) : (
                <button
                    // onClick={deleteHandler}
                    onClick={() => setConfirmation(true)}
                    className="btn btn-danger">
                    Удалить Дэшборд
                </button>
            )}
        </div>
    );
}
