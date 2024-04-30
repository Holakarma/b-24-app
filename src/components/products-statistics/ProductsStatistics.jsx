import React from "react";
import { AddGoal } from "../addGoal/AddGoal";
import { ProgressGoal } from "../progress-goal/ProgressGoal";

export function ProductsStatistics({
    setError,
    categoriesProductsGoal,
    setCategoriesProductsGoal,
    setChanges,
    chosenCategories,
    countProducts
}) {

    return (

            <div className="bg-body-tertiary rounded-4 p-4 mb-2">
                <div className="row g-0">
                    <AddGoal
                        setError={setError}
                        goal={categoriesProductsGoal}
                        setGoal={setCategoriesProductsGoal}
                        setChanges={setChanges}
                        dimension={"Товаров"}
                        description={"Цель товаров"}
                    />
                </div>
                {chosenCategories.length != 0 ? (
                    <ProgressGoal
                        chosenCategories={chosenCategories}
                        goal={categoriesProductsGoal}
                        sum={countProducts}
                        dimension={"Товаров"}
                    /> 
                ) : null}
            </div>
    );
}