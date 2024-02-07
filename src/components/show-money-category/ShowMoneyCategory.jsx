import React, { useEffect } from "react";
import { getDeals } from "../../utils/createSavedDeals";

export function ShowMoneyCategory({ category, dealsSum, addSum }) {
    const [dealList, setDealList] = React.useState([]);
    const [opportunity, setOpportunity] = React.useState(0);
    let opportunitySum = 0;
    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            if (category.id) {
                getDeals(category.id).then((result) => {
                    setDealList(result);
                    result.forEach((deal) => {
                        if (deal.STAGE_SEMANTIC_ID === "S") {
                            opportunitySum += deal.OPPORTUNITY
                                ? parseInt(deal.OPPORTUNITY)
                                : 0;
                        }
                    });
                    addSum(opportunitySum);
                    setOpportunity(opportunitySum);
                });
            }
        }
        return () => {
            addSum(-opportunitySum);
            isMounted = false;
        };
    }, [category]);
    function getPercent(value) {
        return Math.round(value * 100) + "%";
    }

    return (
        <li
            className="list-group-item">
            <div className="row g-0">
                <div className="col-3">{category.name}</div>
                <div className="progress col align-self-center" style={{height: 100 + "%"}}>
                    <div
                        className="progress-bar"
                        style={{
                            width: dealsSum
                                ? getPercent(opportunity / dealsSum)
                                : 0,
                        }}>
                        {dealsSum ? getPercent(opportunity / dealsSum) : "0%"}
                    </div>
                </div>
                <div className="col-2 text-center">{opportunity} руб</div>
            </div>
        </li>
    );
}
