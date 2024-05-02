import React, { useEffect } from 'react';
import { getUsers } from '../../utils/createSavedUsers';
import { ShowAvatar } from '../showAvatar/ShowAvatar';
import styles from './dashboard-style.module.css';

export function Dashboard({
    setOpenedDashboard,
    dashboard,
    loadUser,
    isUsersLoaded,
}) {
    function openDashboardHandler() {
        setOpenedDashboard(dashboard);
        setTimeout(BX24.fitWindow, 10);
    }
    const usersList = dashboard.PROPERTY_VALUES.PARTICIPANTS_LIST
        ? dashboard.PROPERTY_VALUES.PARTICIPANTS_LIST.split(',')
        : [];

    const users = React.useRef([]);

    useEffect(() => {
        let isMounted = true;
        getUsers(usersList).then((res) => {
            if (isMounted) {
                users.current = res;
                setTimeout(BX24.fitWindow, 10);
                loadUser();
            }
        });
        return () => {
            isMounted = false;
        };
    }, [usersList]);

    return (
        <div
            onClick={openDashboardHandler}
            className={`card ${styles.dashboardCard} p-4 mt-2 pointer`}
        >
            <h6 className="display-6">{dashboard.NAME}</h6>
            {isUsersLoaded && usersList.length !== 0 ? (
                <div>
                    <p>Доступен для</p>
                    <div className="row row-cols-3 g-1">
                        {users.current.map((user) => {
                            return (
                                <ShowAvatar
                                    key={user.ID}
                                    user={user}
                                />
                            );
                        })}
                    </div>
                </div>
            ) : (
                'Дашборд доступен только вам'
            )}
        </div>
    );
}
