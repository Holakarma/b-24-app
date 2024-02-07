export function saveCompanyParameters(
    setCategoriesList,
    isChanged,
    setChanges,
    companyMoneyGoal,
    companyDealsGoal,
    companyProductsGoal,
    activeCategories,
    dashboard,
    setDashboards,
    showSavedDialog,
    setError,
    moneyStatistics,
    dealsStatistics,
    productsStatistics,
) {
    if (!isChanged) return;
    if (activeCategories.length == 0) {
        setError("noCategories");
        return;
    }
    let statistics = [];
    if (moneyStatistics) {
        statistics.push("money");
    }
    if (dealsStatistics) {
        statistics.push("deals");
    }
    if (productsStatistics) {
        statistics.push("products");
    }
    BX24.callBatch(
        [
            [
                "entity.item.update",
                {
                    ENTITY: "dashboards",
                    ID: dashboard.ID,
                    PROPERTY_VALUES: {
                        COMPANY_MONEY_GOAL: companyMoneyGoal,
                    },
                },
            ],
            [
                "entity.item.update",
                {
                    ENTITY: "dashboards",
                    ID: dashboard.ID,
                    PROPERTY_VALUES: {
                        COMPANY_DEALS_GOAL: companyDealsGoal,
                    },
                },
            ],
            [
                "entity.item.update",
                {
                    ENTITY: "dashboards",
                    ID: dashboard.ID,
                    PROPERTY_VALUES: {
                        COMPANY_PRODUCTS_GOAL: companyProductsGoal,
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
