import React from "react";
import { AddCompanyGoal } from "../add-company-goal/AddCompanyGoal";
import { ShowDealsCategory } from "../show-deals-category/ShowDealsCategory";
import { ProgressGoal } from "../progress-goal/ProgressGoal";

export function DealsStatistics({
    setError,
    companyDealsGoal,
    setCompanyDealsGoal,
    setChanges,
    chosenCategories,
}) {
    const [countDeals, setCountDeals] = React.useState(0);
    const count = React.useRef(0);

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="mb-0">Cтатистика по сделкам</h5>
            </div>
            <div className="card-body">
                <div className="row g-0">
                    <AddCompanyGoal
                        setError={setError}
                        companyGoal={companyDealsGoal}
                        setCompanyGoal={setCompanyDealsGoal}
                        setChanges={setChanges}
                        description={"Сделок"}
                    />
                </div>
                {chosenCategories.length != 0 ? (
                    <ProgressGoal
                        chosenCategories={chosenCategories}
                        goal={companyDealsGoal}
                        sum={countDeals}
                        description={"Сделок"}
                    /> 
                ) : null}
                {chosenCategories.length == 0 ? null : (
                    <div className="my-2 card">
                        <h6 className="card-header">Статистика по направлениям</h6>
                        <ul className="g-0 card-body list-group list-group-flush p-0">
                           {chosenCategories.map((category) => {
                                count.current = countDeals;
                                return (
                                    <ShowDealsCategory
                                        key={category.id}
                                        category={category}
                                        countDeals={countDeals}
                                        addCount={(res) => {
                                            count.current += res;
                                            setCountDeals(count.current);
                                        }}
                                    />
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}