import React, { useEffect } from 'react';
import { getDeals } from '../../utils/createSavedDeals';
import { getProducts } from '../../utils/createSavedProducts';
import { formatNumber } from '../../utils/formatingNumbers';
import { PeriodContext } from '../../utils/contexts';

export function ShowProductsCategory({ category, countProducts, addCount }) {
    const [count, setCount] = React.useState(0);

    const period = React.useContext(PeriodContext);

    useEffect(() => {
        let isMounted = true;
        let productsWon = [];
        let countCompleted = 0;
        if (category.id) {
            getDeals(category.id).then((result) => {
                if (isMounted) {
                    result.forEach((deal) => {
                        const dateModify = new Date(deal.DATE_MODIFY);
                        if (
                            deal.STAGE_SEMANTIC_ID === 'S' &&
                            dateModify > period.dateStart &&
                            dateModify < period.dateEnd
                        ) {
                            productsWon.push(deal.ID);
                        }
                    });
                    getProducts(
                        productsWon,
                        category.id,
                        period.dateEnd && period.dateStart ? true : false,
                    ).then((result) => {
                        if (isMounted) {
                            countCompleted = result.length;
                            addCount(countCompleted);
                            setCount(countCompleted);
                        }
                    });
                }
            });
        }
        return () => {
            addCount(-countCompleted);
            isMounted = false;
        };
    }, [category, period]);

    function getPercent(value) {
        return Math.round(value * 100) + '%';
    }

    return (
        <div className="row g-0 my-3">
            <div className="col-2 text-end pe-4">Товары</div>
            <div
                className="progress col align-self-center"
                style={{ height: 100 + '%' }}
            >
                <div
                    className="progress-bar"
                    style={{
                        width: countProducts
                            ? getPercent(count / countProducts)
                            : 0,
                    }}
                >
                    {countProducts ? getPercent(count / countProducts) : '0%'}
                </div>
            </div>
            <div className="col-3 ps-4">{formatNumber(count)}</div>
        </div>
    );
}
