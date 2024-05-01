import React from 'react';

export function DeleteDashboard({
    dashboard,
    setDashboards,
    setOpenedDashboard,
}) {
    const [showconfirmation, setConfirmation] = React.useState(false);

    function deleteHandler() {
        BX24.callMethod(
            'entity.item.delete',
            {
                ENTITY: 'dashboards',
                ID: dashboard.ID,
            },
            function (result) {
                BX24.callMethod(
                    'entity.item.get',
                    { ENTITY: 'dashboards' },
                    function (result) {
                        setDashboards(result.data());
                    },
                );
                setOpenedDashboard(undefined);
                setTimeout(BX24.fitWindow, 10);
                BX24.scrollParentWindow(180);
            },
        );
    }
    return (
        <div className="text-end">
            {showconfirmation ? (
                <div className="row row-cols-auto justify-content-end align-items-center g-0 gap-2">
                    <span className="col">Вы уверены?</span>
                    <button
                        className="btn btn-success"
                        onClick={deleteHandler}
                    >
                        Да
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => setConfirmation(false)}
                    >
                        Отмена
                    </button>
                </div>
            ) : (
                <span
                    onClick={() => setConfirmation(true)}
                    className="text-danger"
                    style={{ cursor: 'pointer' }}
                >
                    Удалить Дашборд
                </span>
            )}
        </div>
    );
}
