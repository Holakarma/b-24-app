export function createDashboardEntity() {
    return new Promise((resolve) => {
        BX24.callMethod(
            'entity.add',
            {
                ENTITY: 'dashboards',
                NAME: 'Dashboards',
                ACCESS: { AU: 'X' },
            },
            function (res) {
                console.log(res);
                BX24.callBatch(
                    [
                        [
                            'entity.item.property.add',
                            {
                                ENTITY: 'dashboards',
                                PROPERTY: 'PARTICIPANTS_LIST',
                                NAME: 'participants list',
                                TYPE: 'S',
                            },
                        ],
                        [
                            'entity.item.property.add',
                            {
                                ENTITY: 'dashboards',
                                PROPERTY: 'CATEGORIES_LIST',
                                NAME: 'categories list',
                                TYPE: 'S',
                            },
                        ],
                        [
                            'entity.item.property.add',
                            {
                                ENTITY: 'dashboards',
                                PROPERTY: 'CATEGORIES_MONEY_GOAL',
                                NAME: 'category money goal',
                                TYPE: 'N',
                            },
                        ],
                        [
                            'entity.item.property.add',
                            {
                                ENTITY: 'dashboards',
                                PROPERTY: 'CATEGORIES_DEALS_GOAL',
                                NAME: 'category deals goal',
                                TYPE: 'N',
                            },
                        ],
                        [
                            'entity.item.property.add',
                            {
                                ENTITY: 'dashboards',
                                PROPERTY: 'CATEGORIES_PRODUCTS_GOAL',
                                NAME: 'category products goal',
                                TYPE: 'N',
                            },
                        ],
                        [
                            'entity.item.property.add',
                            {
                                ENTITY: 'dashboards',
                                PROPERTY: 'CATEGORIES_CALLS_GOAL',
                                NAME: 'category calls goal',
                                TYPE: 'N',
                            },
                        ],
                        [
                            'entity.item.property.add',
                            {
                                ENTITY: 'dashboards',
                                PROPERTY: 'USE_STATISTICS',
                                NAME: 'statistics list',
                                TYPE: 'S',
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
