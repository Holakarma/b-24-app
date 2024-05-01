import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { getCategories } from "./utils/createSavedCategories";
import { createDashboardEntity } from "./utils/createDashboardEntity.js";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "./style/style.css";

createDashboardEntity()
BX24.init(initHandler);

function initHandler() {
    BX24.callMethod(
        "crm.category.list",
        { entityTypeId: 2 },
        function (result) {
            const arCategories = result.data().categories;
            const categoriesId = [];
            arCategories.forEach((category) => {
                categoriesId.push(category.id);
            });
            getCategories(categoriesId).then(() => {
                BX24.callMethod(
                    "entity.get",
                    { ENTITY: "dashboards" },
                    function (result) {
                        if (result.error()) {
                            if (
                                result.answer.error === "ERROR_ENTITY_NOT_FOUND"
                            ) {
                                createDashboardEntity().then((result) => {
                                    console.log(result);
                                    ReactDOM.render(
                                        <App oldDashboards={[]} />,
                                        document.getElementById("app"),
                                    );
                                });
                            } else {
                                console.error(result.error());
                            }
                        } else {
                            BX24.callMethod(
                                "entity.item.get",
                                {
                                    ENTITY: "dashboards",
                                },
                                function (result) {
                                    let userCurrent;
                                    //получили id текущего пользователя
                                    function getUserIdCurrent() {
                                        return new Promise((resolve) => {
                                            BX24.callMethod('user.current', {}, function (res) {
                                                userCurrent = res.data();
                                                resolve(userCurrent);
                                            });
                                        });
                                    }
                                    //проверка совпадения id текущего пользователя и id пользователей, которым доступ разрешен
                                    getUserIdCurrent().then((userInfo) => {
                                        const userId = userInfo.ID
                                        const avalibleDashboards = result.data().filter(dashboard => {
                                            const participantsList = dashboard.PROPERTY_VALUES.PARTICIPANTS_LIST.split(',')
                                            return (
                                                participantsList.includes(userId)
                                            )
                                        })
                                        ReactDOM.render(
                                            <App oldDashboards={avalibleDashboards} />,
                                            document.getElementById("app"),
                                        );
                                    });


                                },
                            );
                        }
                    },
                );
            });
        },
    );
}


