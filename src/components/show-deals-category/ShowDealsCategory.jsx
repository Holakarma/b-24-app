import React, { useEffect } from "react";
import { getDeals } from "../../utils/createSavedDeals";

export function ShowDealsCategory({ category, countDeals, addCount }) {
    const [count, setCount] = React.useState(0);
    let countCompleted = 0;

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (category.id) {
                getDeals(category.id).then((result) => {
                    result.forEach((deal) => {
                        if (deal.STAGE_SEMANTIC_ID === "S") {
                            countCompleted++;
                        }
                    });
                    addCount(countCompleted);
                    setCount(countCompleted);
                });
            }
        }
        return () => {
            addCount(-countCompleted);
            isMounted = false;
        };
    }, [category]);
    function getPercent(value) {
        return Math.round(value * 100) + "%";
    }

    return (
        <li className="list-group-item">
            <div className="row g-0">
                <div className="col-3">{category.name}</div>
                <div
                    className="progress col align-self-center"
                    style={{ height: 100 + "%" }}>
                    <div
                        className="progress-bar"
                        style={{
                            width: countDeals
                                ? getPercent(count / countDeals)
                                : 0,
                        }}>
                        {countDeals ? getPercent(count / countDeals) : "0%"}
                    </div>
                </div>
                <div className="col-2 text-center">{count}</div>
            </div>
        </li>
    );
}
