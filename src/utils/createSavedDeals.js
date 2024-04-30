export const getDeals = (function (savedCategories = []) {
    return function (category) {
        const deals = savedCategories.find(
            (savedCategory) => savedCategory.id == category,
        );
        return new Promise((resolve) => {
            if (deals) resolve(deals.deals);
            else {
                BX24.callMethod(
                    "crm.deal.list",
                    {
                        filter: { CATEGORY_ID: category },
                    },
                    function (result) {
                        if (result.error()) console.error(result.error());
                        else {
                            const savedDeals = savedCategories.find(
                                (obj) => obj.id == category,
                            );
                            if (savedDeals) {
                                savedDeals.deals = savedDeals.deals.concat(
                                    result.data(),
                                );
                            } else {
                                savedCategories.push({
                                    id: category,
                                    deals: result.data(),
                                });
                            }
                            if (result.more()) {
                                result.next();
                            } else {
                                resolve(result.data());
                            }
                        }
                    },
                );
            }
        });
    };
})();
