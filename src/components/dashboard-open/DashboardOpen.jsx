import React, { useEffect, useMemo } from 'react';
import { DeleteDashboard } from '../delete-dashboard/DeleteDashboard';
import { ShowParticipants } from '../show-participants/ShowParticipants';
import { getUsers } from '../../utils/createSavedUsers';
import { alias, openedStat } from './openedStat';
import { CategoryStat } from '../category-components/category-stat/CategoryStat';
import DepartmentStat from '../department-components/deparatmentStat/DepartmentStat';

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
            case 'users':
                setFetchedUsers(true);
                break;
            case 'categories':
                setFetchedCateories(true);
                break;
        }
    }
    useEffect(() => {
        if (fetchedUsers && fetchedCategories) setRender(true);
    }, [fetchedUsers, fetchedCategories]);

    const [arParticipants, setArParticipants] = React.useState([]);
    useEffect(() => {
        let isMounted = true;
        if (usersList != '') {
            getUsers(usersList.split(',')).then((result) => {
                if (isMounted) {
                    setArParticipants(result);
                    fetchParams('users');
                }
            });
        } else {
            fetchParams('users');
        }
        if (isMounted) {
            setTitle(dashboard.PROPERTY_VALUES.DASHBOARD_TITLE);
        }
        return () => {
            setTitle('Дашборды');
            isMounted = false;
        };
    }, [usersList]);

    const [pickedStat, pickStat] = React.useState(openedStat.category);

    let props = useMemo(() => {
        switch (pickedStat) {
            case openedStat.category:
                return {
                    render,
                    dashboard,
                    fetchParams,
                    setDashboards,
                };
            case openedStat.department:
                return {
                    test: 'test',
                };
        }
    }, [pickedStat, render, dashboard]);

    const stats = React.useMemo(() => {
        const resArr = [];
        for (let i in openedStat) {
            resArr.push(i);
        }
        return resArr;
    }, []);

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
                    aria-label="Close"
                ></button>
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        {stats.map((s) => (
                            <li
                                key={s}
                                className="nav-item"
                            >
                                <button
                                    className={`nav-link ${
                                        pickedStat === openedStat[s] && 'active'
                                    }`}
                                    onClick={() => pickStat(openedStat[s])}
                                >
                                    {openedStat[s]}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="card-body">{alias(pickedStat, props)}</div>
                <div className="card-footer">
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
