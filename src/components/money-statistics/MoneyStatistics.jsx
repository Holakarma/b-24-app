import React from "react";
import { AddGoal } from "../addGoal/AddGoal";
import { ProgressGoal } from "../progress-goal/ProgressGoal";

export function MoneyStatistics({
    setError,
    categoriesMoneyGoal,
    setCategoriesMoneyGoal,
    setChanges,
    chosenCategories,
    dealsSum,
}) {
    return (
        <div className="bg-body-tertiary rounded-4 p-4 mb-2">
            <div className="row g-0">
                <AddGoal
                    setError={setError}
                    goal={categoriesMoneyGoal}
                    setGoal={setCategoriesMoneyGoal}
                    setChanges={setChanges}
                    dimension={"Руб"}
                    description={"Финансовая цель"}
                />
            </div>
            {chosenCategories != "" ? (
                <ProgressGoal
                    chosenCategories={chosenCategories}
                    goal={categoriesMoneyGoal}
                    sum={dealsSum}
                    dimension={"Руб"}
                />
            ) : null}
        </div>
    );
}
