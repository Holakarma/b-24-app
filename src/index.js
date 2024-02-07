import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./style/style.css";
import { getCategories } from "./utils/createSavedCategories";

const entityName = "Dashboards";
const entityId = "dashboards";

BX24.init(initHandler);

function createDashboardEntity() {
    BX24.callMethod("entity.add", {
        ENTITY: `${entityId}`,
        NAME: `${entityName}`,
        ACCESS: { AU: "X" },
    });
    BX24.callMethod("entity.item.property.add", {
        ENTITY: "dashboards",
        PROPERTY: "DASHBOARD_TITLE",
        NAME: "dashboard title",
        TYPE: "S",
    });
    BX24.callMethod("entity.item.property.add", {
        ENTITY: "dashboards",
        PROPERTY: "PARTICIPANTS_LIST",
        NAME: "participants list",
        TYPE: "S",
    });
    BX24.callMethod("entity.item.property.add", {
        ENTITY: "dashboards",
        PROPERTY: "CATEGORIES_LIST",
        NAME: "categories list",
        TYPE: "S",
    });
    BX24.callMethod("entity.item.property.add", {
        ENTITY: "dashboards",
        PROPERTY: "COMPANY_MONEY_GOAL",
        NAME: "company money goal",
        TYPE: "N",
    });
    BX24.callMethod("entity.item.property.add", {
        ENTITY: "dashboards",
        PROPERTY: "COMPANY_DEALS_GOAL",
        NAME: "company deals goal",
        TYPE: "N",
    });
    BX24.callMethod("entity.item.property.add", {
        ENTITY: "dashboards",
        PROPERTY: "COMPANY_PRODUCTS_GOAL",
        NAME: "company products goal",
        TYPE: "N",
    });
    BX24.callMethod("entity.item.property.add", {
        ENTITY: "dashboards",
        PROPERTY: "USE_STATISTICS",
        NAME: "statistics list",
        TYPE: "S",
    });
}

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
                    { ENTITY: `${entityId}` },
                    function (result) {
                        if (result.error()) {
                            if (
                                result.answer.error === "ERROR_ENTITY_NOT_FOUND"
                            ) {
                                createDashboardEntity();
                                ReactDOM.render(
                                    <App oldDashboards={[]} />,
                                    document.getElementById("app"),
                                );
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
                                    ReactDOM.render(
                                        <App oldDashboards={result.data()} />,
                                        document.getElementById("app"),
                                    );
                                },
                            );
                        }
                    },
                );
            });
        },
    );
}
