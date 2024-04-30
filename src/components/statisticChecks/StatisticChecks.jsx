import React from "react";

export function StatisticChecks({ usedStatistics, setStatistics, setChanges }) {
    const [isCalls, setCalls] = React.useState(
        usedStatistics.OUTGOING_CALLS ||
            usedStatistics.INCOMING_CALLS ||
            usedStatistics.GENERAL_CALLS,
    );
    return (
        <div className="mb-4">
            <div className="form-check form-switch mb-3 mt-4">
                <input
                    checked={usedStatistics.MONEY}
                    onChange={() => {
                        setStatistics({
                            ...usedStatistics,
                            MONEY: usedStatistics.MONEY ? false : true,
                        });
                        setChanges(true);
                    }}
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchMoney"
                />
                <label
                    className="form-check-label"
                    htmlFor="switchMoney">
                    Использовать финансовую статистику
                </label>
            </div>

            <div className="form-check form-switch my-3">
                <input
                    checked={usedStatistics.DEALS}
                    onChange={() => {
                        setStatistics({
                            ...usedStatistics,
                            DEALS: usedStatistics.DEALS ? false : true,
                        });
                        setChanges(true);
                    }}
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchDeals"
                />
                <label
                    className="form-check-label"
                    htmlFor="switchDeals">
                    Использовать статистику сделок
                </label>
            </div>

            <div className="form-check form-switch my-3">
                <input
                    checked={usedStatistics.PRODUCTS}
                    onChange={() => {
                        setStatistics({
                            ...usedStatistics,
                            PRODUCTS: usedStatistics.PRODUCTS ? false : true,
                        });
                        setChanges(true);
                    }}
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchProducts"
                />
                <label
                    className="form-check-label"
                    htmlFor="switchProducts">
                    Использовать статистику по товарам
                </label>
            </div>

            <div className="form-check form-switch mt-3 mb-2">
                <input
                    checked={
                        usedStatistics.OUTGOING_CALLS ||
                        usedStatistics.INCOMING_CALLS ||
                        usedStatistics.GENERAL_CALLS
                    }
                    onChange={() => {
                        if (isCalls) {
                            setStatistics({
                                ...usedStatistics,
                                OUTGOING_CALLS: false,
                                INCOMING_CALLS: false,
                                GENERAL_CALLS: false,
                            });
                            setCalls(false);
                        } else {
                            setStatistics({
                                ...usedStatistics,
                                GENERAL_CALLS: true,
                            });
                            setCalls(true);
                        }
                        setChanges(true);
                    }}
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="switchCalls"
                />
                <label
                    className="form-check-label"
                    htmlFor="switchCalls">
                    Использовать статистику по звонкам
                </label>
            </div>

            {isCalls ? (
                <div className="ps-4">
                    <div className="form-check">
                        <input
                            checked={usedStatistics.OUTGOING_CALLS}
                            onChange={() => {
                                setStatistics({
                                    ...usedStatistics,
                                    OUTGOING_CALLS:
                                        usedStatistics.OUTGOING_CALLS
                                            ? false
                                            : true,
                                });
                                setChanges(true);
                            }}
                            className="form-check-input"
                            type="checkbox"
                            id="checkOutgoing"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="checkOutgoing">
                            Исходящие звонки
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            checked={usedStatistics.INCOMING_CALLS}
                            onChange={() => {
                                setStatistics({
                                    ...usedStatistics,
                                    INCOMING_CALLS:
                                        usedStatistics.INCOMING_CALLS
                                            ? false
                                            : true,
                                });
                                setChanges(true);
                            }}
                            className="form-check-input"
                            type="checkbox"
                            id="checkIncoming"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="checkIncoming">
                            Входящие звонки
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            checked={usedStatistics.GENERAL_CALLS}
                            onChange={() => {
                                setStatistics({
                                    ...usedStatistics,
                                    GENERAL_CALLS: usedStatistics.GENERAL_CALLS
                                        ? false
                                        : true,
                                });
                                setChanges(true);
                            }}
                            className="form-check-input"
                            type="checkbox"
                            id="checkGeneralCalls"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="checkGeneralCalls">
                            Общее количество звонков
                        </label>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
