import React from "react";

export function ProgressGoal({ chosenCategories, goal, sum, description }) {
    if (goal == 0 || !goal) {
        return null;
    }
    if (chosenCategories.length != 0) {
        const rest = goal - sum;
        const value = parseInt(goal) ? Math.round((sum / goal) * 100) : 0;
        return (
            <div className="row g-0 my-3 gap-2">
                <div className="col-2 align-self-center text-center">
                    {sum} / <span className="text-secondary">{goal}</span>
                </div>
                <div
                    className="progress col align-self-center"
                    style={{ height: 25 + "px" }}>
                    <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        style={{ width: value ? value + "%" : "0%" }}>
                        {value ? value + "%" : ""}
                    </div>
                </div>
                <div className="col-4 text-center">
                    {rest <= 0
                        ? value ? "План выполнен!" : "План не установлен"
                        : `До выполнения плана: ${rest} ${description}`}
                </div>
            </div>
        );
    }
    return null;
}
