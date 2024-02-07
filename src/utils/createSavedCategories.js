export const getCategories = (function crarteSavedCategories(savedCategories=[]) {
    return function (categoriesId = '-1') {
        if (categoriesId) {
            if (categoriesId == '-1') {
                return new Promise(resolve => {
                    resolve(savedCategories);
                })
            }
            let arResult = [];
            let needToFetch = [];
            categoriesId.forEach((id) => {
                const savedCategory = savedCategories.find(
                    (savedCategory) => savedCategory.id == id,
                );
                if (savedCategory) {
                    arResult.push(savedCategory);
                } else {
                    needToFetch.push(id);
                }
            });
            const fetchBatch = [];
            return new Promise((resolve, reject) => {
                if (needToFetch.length != 0) {
                    needToFetch.map((id) => {
                        fetchBatch.push(["crm.category.get", { entityTypeId: 2, id: id }]);
                    });
                    BX24.callBatch(fetchBatch, function (result) {
                        result.forEach((res) => {
                            savedCategories.push(res.data().category);
                            arResult.push(res.data().category);
                        });
                        resolve(arResult);
                    });
                } else {
                    resolve(arResult);
                }
            });
        }
    }
})()