import React from "react";
import { AddGoal } from "../addGoal/AddGoal";
import { ProgressGoal } from "../progress-goal/ProgressGoal";

export function DealsStatistics({
    setError,
    categoriesDealsGoal,
    setCategoriesDealsGoal,
    setChanges,
    chosenCategories,
    countDeals
}) {

    return (
        <div>
            <div className="bg-body-tertiary rounded-4 p-4 mb-2">
                <div className="row g-0">
                    <AddGoal
                        setError={setError}
                        goal={categoriesDealsGoal}
                        setGoal={setCategoriesDealsGoal}
                        setChanges={setChanges}
                        dimension={"Сделок"}
                        description={"Цель сделок"}
                    />
                </div>
                {chosenCategories.length != 0 ? (
                    <ProgressGoal
                        chosenCategories={chosenCategories}
                        goal={categoriesDealsGoal}
                        sum={countDeals}
                        dimension={"Сделок"}
                    />
                ) : null}
            </div>
        </div>
    );
}
