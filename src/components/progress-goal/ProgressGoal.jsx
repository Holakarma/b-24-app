import React from "react";
import { formatNumber } from "../../utils/formatingNumbers";

export function ProgressGoal({
    chosenCategories,
    goal,
    sum,
    dimension,
    description,
}) {
    if (goal == 0 || !goal) {
        return null;
    }
    if (chosenCategories.length != 0) {
        const rest = goal - sum;
        const value = parseInt(goal) ? Math.floor((sum / goal) * 100) : 0;
        return (
            <div className="row g-0 mt-3 gap-2">
                {description ? (
                    <div className="col-2 align-self-center text-center">
                        {description}
                    </div>
                ) : null}
                <div className="col-3 align-self-center text-center">
                    {formatNumber(sum)} /{" "}
                    <span className="text-secondary">{formatNumber(goal)}</span>
                </div>
                <div
                    className="progress col align-self-center"
                    style={{ height: 25 + "px" }}>
                    <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        style={{ width: value ? value + "%" : "0%" }}>
                        {value ? formatNumber(value) + "%" : ""}
                    </div>
                </div>
                <div className="col-4 text-center align-self-center">
                    {rest <= 0
                        ? value
                            ? "План выполнен!"
                            : "План не установлен"
                        : `До выполнения плана: ${formatNumber(
                              rest,
                          )}\u00A0${dimension}`}
                </div>
            </div>
        );
    }
    return null;
}
