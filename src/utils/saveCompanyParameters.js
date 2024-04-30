export function saveCompanyParameters(
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
    showSavedDialog,
    setError,
    usedStatistics,
) {
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
                    setDashboards(result.data());
                    showSavedDialog(true);
                    setTimeout(showSavedDialog, 2000, false);
                    setTimeout(setChanges, 2000, false);
                    setCategoriesList(
                        result.data().find((db) => db.ID == dashboard.ID)
                            .PROPERTY_VALUES.CATEGORIES_LIST,
                    );
                },
            );
        },
    );
}
