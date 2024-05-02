import React, { useEffect } from 'react';
import { getDeals } from '../../utils/createSavedDeals';
import { formatNumber } from '../../utils/formatingNumbers';
import { PeriodContext } from '../../utils/contexts';

export function ShowDealsCategory({ category, countDeals, addCount }) {
    const [count, setCount] = React.useState(0);
    let countCompleted = 0;

    const period = React.useContext(PeriodContext);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
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
                                countCompleted++;
                            }
                        });
                        addCount(countCompleted);
                        setCount(countCompleted);
                    }
                });
            }
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
            <div className="col-2 text-end pe-4">Сделки</div>
            <div
                className="progress col align-self-center"
                style={{ height: 100 + '%' }}
            >
                <div
                    className="progress-bar"
                    style={{
                        width: countDeals ? getPercent(count / countDeals) : 0,
                    }}
                >
                    {countDeals ? getPercent(count / countDeals) : '0%'}
                </div>
            </div>
            <div className="col-3 ps-4">{formatNumber(count)}</div>
        </div>
    );
}
