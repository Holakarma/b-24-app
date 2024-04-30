import React, { useEffect } from "react";
import { DeleteDashboard } from "../delete-dashboard/DeleteDashboard";
import { ShowParticipants } from "../show-participants/ShowParticipants";
import { getUsers } from "../../utils/createSavedUsers";
import { CategoryStat } from "../category-components/category-stat/CategoryStat";

export function DashboardOpen({
    setTitle,
    dashboard,
    setDashboards,
    setOpenedDashboard,
}) {
    BX24.scrollParentWindow(180);
    const usersList = dashboard.PROPERTY_VALUES.PARTICIPANTS_LIST;
    const [fetchedUsers, setFetchedUsers] = React.useState(false);
    const [fetchedCategories, setFetchedCateories] = React.useState(false);
    const [render, setRender] = React.useState(false);
    function fetchParams(param) {
        switch (param) {
            case "users":
                setFetchedUsers(true);
                if (fetchedCategories) {
                    setRender(true);
                }
                break;
            case "categories":
                setFetchedCateories(true);
                if (fetchedUsers) {
                    setRender(true);
                }
                break;
        }
    }

    const [arParticipants, setArParticipants] = React.useState([]);

    useEffect(() => {
        let isMounted = true;
        if (usersList != "") {
            getUsers(usersList.split(",")).then((result) => {
                if (isMounted) {
                    setArParticipants(result);
                    fetchParams("users");
                }
            });
        } else {
            fetchParams("users");
        }
        if (isMounted) {
            setTitle(dashboard.PROPERTY_VALUES.DASHBOARD_TITLE);
        }
        return () => {
            setTitle("Дашборды");
            isMounted = false;
        };
    }, [usersList]);

    return (
        <>
            <div className={`card border-2 w-100 text-bg-body`}>
                <button
                    onClick={() => {
                        BX24.scrollParentWindow(180);
                        setOpenedDashboard(undefined);
                    }}
                    type="button"
                    className="btn-close position-absolute end-0 top-0"
                    aria-label="Close"></button>
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                            <button className="nav-link active">
                                Воронки
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link">
                                Отделы
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link">
                                Сотрудники
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link">
                                Настраиваемая статистика
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="card-body">
                    <CategoryStat
                        render={render}
                        dashboard={dashboard}
                        fetchParams={fetchParams}
                        setDashboards={setDashboards}
                    />
                    {/* {usersList === "" ? null : (
                        <ShowParticipants arParticipants={arParticipants} />
                    )} */}
                    <DeleteDashboard
                        dashboard={dashboard}
                        setDashboards={setDashboards}
                        setOpenedDashboard={setOpenedDashboard}
                    />
                </div>
            </div>
        </>
    ); /* : (
        <div className="row g-0 justify-content-center">
            <div className="spinner-border col-2">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="ms-3 mb-0 col align-self-center">
                Загрузка данных из CRM, подождите...
            </p>
        </div>
    ); */
}
