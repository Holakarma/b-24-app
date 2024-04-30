import React from "react";
import { AddGoal } from "../addGoal/AddGoal";
import { ProgressGoal } from "../progress-goal/ProgressGoal";

export function CallsStatistics({
    setError,
    categoriesCallsGoal,
    setCategoriesCallsGoal,
    setChanges,
    chosenCategories,
    countCalls,
    usedStatistics,
}) {
    return (
        <div className="bg-body-tertiary rounded-4 p-4 mb-2">
            <div className="row g-0">
                <AddGoal
                    setError={setError}
                    goal={categoriesCallsGoal}
                    setGoal={setCategoriesCallsGoal}
                    setChanges={setChanges}
                    dimension={"Минут"}
                    description={"Цель звонков"}
                />
            </div>
            {chosenCategories.length != 0 ? (
                <>
                    {usedStatistics.OUTGOING_CALLS ? (
                        <ProgressGoal
                            chosenCategories={chosenCategories}
                            goal={categoriesCallsGoal}
                            sum={countCalls.outgoing}
                            dimension={"Минут"}
                            description={"Исходящие звонки"}
                        />
                    ) : null}
                    {usedStatistics.INCOMING_CALLS ? (
                        <ProgressGoal
                            chosenCategories={chosenCategories}
                            goal={categoriesCallsGoal}
                            sum={countCalls.incoming}
                            dimension={"Минут"}
                            description={"Входящие звонки"}
                        />
                    ) : null}
                    {usedStatistics.GENERAL_CALLS ? (
                        <ProgressGoal
                            chosenCategories={chosenCategories}
                            goal={categoriesCallsGoal}
                            sum={countCalls.general}
                            dimension={"Минут"}
                            description={"Общее"}
                        />
                    ) : null}
                </>
            ) : null}
        </div>
    );
}
