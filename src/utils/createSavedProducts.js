export const getProducts = (function (savedDeals = []) {
    return function (dealsId, categoryId, refresh = false) {
        const savedProducts = savedDeals.find(
            (savedDeal) => savedDeal.id == categoryId,
        );
        return new Promise((resolve) => {
            if (savedProducts && !refresh) resolve(savedProducts.productRows);
            else {
                let arResult = [];
                let fetchBatch = [];
                dealsId.forEach((dealId) => {
                    fetchBatch.push([
                        'crm.item.productrow.list',
                        {
                            filter: {
                                '=ownerType': 'D',
                                '=ownerId': dealId,
                            },
                        },
                    ]);
                });
                BX24.callBatch(fetchBatch, function (result) {
                    result.forEach((answer) => {
                        arResult = arResult.concat(answer.data().productRows);
                    });
                    savedDeals.push({
                        id: categoryId,
                        productRows: arResult,
                    });
                    resolve(arResult);
                });
            }
        });
    };
})();
