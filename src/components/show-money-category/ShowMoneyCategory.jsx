import React, { useEffect, useContext } from 'react';
import { getDeals } from '../../utils/createSavedDeals';
import { formatNumber } from '../../utils/formatingNumbers';
import { PeriodContext } from '../../utils/contexts';

export function ShowMoneyCategory({ category, dealsSum, addSum }) {
    const [opportunity, setOpportunity] = React.useState(0);
    const period = useContext(PeriodContext);
    let opportunitySum = 0;
    useEffect(() => {
        let isMounted = true;
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
                            opportunitySum += deal.OPPORTUNITY
                                ? parseInt(deal.OPPORTUNITY)
                                : 0;
                        }
                    });
                    addSum(opportunitySum);
                    setOpportunity(opportunitySum);
                }
            });
        }
        return () => {
            addSum(-opportunitySum);
            isMounted = false;
        };
    }, [category, period]);

    return (
        <div className="row g-0 my-3">
            <div className="col-2 text-end pe-4">Выручка</div>
            <div
                className="progress col align-self-center"
                style={{ height: 100 + '%' }}
            >
                <div
                    className="progress-bar"
                    style={{
                        width: dealsSum
                            ? getPercent(opportunity / dealsSum)
                            : 0,
                    }}
                >
                    {dealsSum ? getPercent(opportunity / dealsSum) : '0%'}
                </div>
            </div>
            <div className="col-3 ps-4">{formatNumber(opportunity)} руб</div>
        </div>
    );
}
function getPercent(value) {
    return Math.round(value * 100) + '%';
}
