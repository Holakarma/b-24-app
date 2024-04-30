import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "./style/style.css";
import { getCategories } from "./utils/createSavedCategories";



console.log("0.0.1-alpha.0.0.2");

const entityName = "Dashboards";
const entityId = "dashboards";

BX24.init(initHandler);

function createDashboardEntity() {
    return new Promise((resolve) => {
        BX24.callMethod(
            "entity.add",
            {
                ENTITY: `${entityId}`,
                NAME: `${entityName}`,
                ACCESS: { AU: "X" },
            },
            function () {
                BX24.callBatch(
                    [
                        [
                            "entity.item.property.add",
                            {
                                ENTITY: `${entityId}`,
                                PROPERTY: "DASHBOARD_TITLE",
                                NAME: "dashboard title",
                                TYPE: "S",
                            },
                        ],
                        [
                            "entity.item.property.add",
                            {
                                ENTITY: `${entityId}`,
                                PROPERTY: "PARTICIPANTS_LIST",
                                NAME: "participants list",
                                TYPE: "S",
                            },
                        ],
                        [
                            "entity.item.property.add",
                            {
                                ENTITY: `${entityId}`,
                                PROPERTY: "CATEGORIES_LIST",
                                NAME: "categories list",
                                TYPE: "S",
                            },
                        ],
                        [
                            "entity.item.property.add",
                            {
                                ENTITY: `${entityId}`,
                                PROPERTY: "CATEGORIES_MONEY_GOAL",
                                NAME: "category money goal",
                                TYPE: "N",
                            },
                        ],
                        [
                            "entity.item.property.add",
                            {
                                ENTITY: `${entityId}`,
                                PROPERTY: "CATEGORIES_DEALS_GOAL",
                                NAME: "category deals goal",
                                TYPE: "N",
                            },
                        ],
                        [
                            "entity.item.property.add",
                            {
                                ENTITY: `${entityId}`,
                                PROPERTY: "CATEGORIES_PRODUCTS_GOAL",
                                NAME: "category products goal",
                                TYPE: "N",
                            },
                        ],
                        [
                            "entity.item.property.add",
                            {
                                ENTITY: `${entityId}`,
                                PROPERTY: "CATEGORIES_CALLS_GOAL",
                                NAME: "category calls goal",
                                TYPE: "N",
                            },
                        ],
                        [
                            "entity.item.property.add",
                            {
                                ENTITY: `${entityId}`,
                                PROPERTY: "USE_STATISTICS",
                                NAME: "statistics list",
                                TYPE: "S",
                            },
                        ],
                    ],
                    function (result) {
                        resolve(result);
                    },
                );
            },
        );
    });
}

/* BX24.callMethod('entity.get', {}, (res) => {
    console.log(res.data())
}) */
/* BX24.callMethod('entity.item.property.get', {'ENTITY': `${entityId}`}, (res) => {
    console.log(res.data())
}) */
/* BX24.callMethod('entity.item.get', {'ENTITY': `${entityId}`}, (res) => {
    console.log(res.data())
}) */
/* BX24.callMethod('entity.delete', {'ENTITY': `${entityId}`}, (res) => {
    console.log(res.data())
}) */

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
                                    ENTITY: `${entityId}`,
                                },
                                function (result) {
                                    // console.log(result)
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
