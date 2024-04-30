import React from "react";
import { formatNumber } from "../../utils/formatingNumbers";
import { TelephoneInbound } from "../../icons/telephone-inbound";

export function ShowCallsCategory({
    category,
    countCalls,
    addCount,
    usedStatistics,
}) {
    const [count, setCount] = React.useState(0);

    function getPercent(value) {
        return Math.round(value * 100) + "%";
    }
    return (
        <div className="row g-0 my-3">
            <div className="col-2 text-end pe-4">
                Звонки
                <TelephoneInbound classNames={"ms-1"}/>
            </div>
            <div
                className="progress col align-self-center"
                style={{ height: 100 + "%" }}>
                <div
                    className="progress-bar"
                    style={{
                        width: countCalls ? getPercent(count / countCalls) : 0,
                    }}>
                    {countCalls ? getPercent(count / countCalls) : "0%"}
                </div>
            </div>
            <div className="col-3 ps-4">{formatNumber(count)}</div>
        </div>
    );
}
