import React, { useEffect } from "react";
import { saveCompanyParameters } from "../../utils/saveCompanyParameters";

export function SaveParametersBtn({
    setCategoriesList,
    isChanged,
    setChanges,
    categoriesMoneyGoal,
    categoriesDealsGoal,
    categoriesProductsGoal,
    categoriesCallsGoal,
    activeCategories,
    dashboard,
    setDashboards,
    error,
    setError,
    usedStatistics,
}) {
    let isMount;

    useEffect(() => {
        isMount = true;
        return () => {
            isMount = false;
        };
    });

    function clickHandler() {
        if (!isChanged) return;
        if (activeCategories.length == 0) {
            setError("noCategories");
            return;
        }
        let statistics = [];
        for (let key in usedStatistics) {
            usedStatistics[key] && statistics.push(key);
        }

        BX24.callBatch(
            [
                [
                    "entity.item.update",
                    {
                        ENTITY: "dashboards",
                        ID: dashboard.ID,
                        PROPERTY_VALUES: {
                            CATEGORIES_MONEY_GOAL: categoriesMoneyGoal,
                        },
                    },
                ],
                [
                    "entity.item.update",
                    {
                        ENTITY: "dashboards",
                        ID: dashboard.ID,
                        PROPERTY_VALUES: {
                            CATEGORIES_DEALS_GOAL: categoriesDealsGoal,
                        },
                    },
                ],
                [
                    "entity.item.update",
                    {
                        ENTITY: "dashboards",
                        ID: dashboard.ID,
                        PROPERTY_VALUES: {
                            CATEGORIES_PRODUCTS_GOAL: categoriesProductsGoal,
                        },
                    },
                ],
                [
                    "entity.item.update",
                    {
                        ENTITY: "dashboards",
                        ID: dashboard.ID,
                        PROPERTY_VALUES: {
                            CATEGORIES_CALLS_GOAL: categoriesCallsGoal,
                        },
                    },
                ],
                [
                    "entity.item.update",
                    {
                        ENTITY: "dashboards",
                        ID: dashboard.ID,
                        PROPERTY_VALUES: {
                            CATEGORIES_LIST: activeCategories.join(","),
                        },
                    },
                ],
                [
                    "entity.item.update",
                    {
                        ENTITY: "dashboards",
                        ID: dashboard.ID,
                        PROPERTY_VALUES: {
                            USE_STATISTICS: statistics.join(","),
                        },
                    },
                ],
            ],
            function () {
                BX24.callMethod(
                    "entity.item.get",
                    { ENTITY: "dashboards" },
                    function (result) {
                        if (isMount) {
                            setDashboards(result.data());
                            showSavedDialog(true);
                            setTimeout(showSavedDialog, 2000, false);
                            setTimeout(setChanges, 2000, false);
                            setCategoriesList(
                                result
                                    .data()
                                    .find((db) => db.ID == dashboard.ID)
                                    .PROPERTY_VALUES.CATEGORIES_LIST,
                            );
                        }
                    },
                );
            },
        );
    }

    const errorNotation = {
        noGoal: "Заполните цель",
        noCategories: "Выберите воронки",
    };
    const [savedDialog, showSavedDialog] = React.useState(false);
    return (
        <div className="row g-0 gap-2 my-2">
            <button
                onClick={clickHandler}
                type="button"
                className={`btn ${error ? "btn-danger" : "btn-success"} w-25`}>
                {error ? "Ошибка" : "Сохранить"}
            </button>
            {savedDialog ? (
                <div className="text-success col align-self-center">
                    Сохранено
                </div>
            ) : null}
            {error ? (
                <div className="text-danger col align-self-center">
                    {errorNotation[error]}
                </div>
            ) : null}
        </div>
    );
}
