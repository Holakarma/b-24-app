import React from "react";
import { AddCompanyGoal } from "../add-company-goal/AddCompanyGoal";
import { ProgressGoal } from "../progress-goal/ProgressGoal";
import { ShowMoneyCategory } from "../show-money-category/ShowMoneyCategory";

export function MoneyStatistics({
    setError,
    companyMoneyGoal,
    setCompanyMoneyGoal,
    setChanges,
    chosenCategories,
}) {
    const [dealsSum, setDealsSum] = React.useState(0);
    const sum = React.useRef(0);

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="mb-0">Финансовая статистика</h5>
            </div>
            <div className="card-body">
                <div className="row g-0">
                    <AddCompanyGoal
                        setError={setError}
                        companyGoal={companyMoneyGoal}
                        setCompanyGoal={setCompanyMoneyGoal}
                        setChanges={setChanges}
                        description={'Руб'}
                    />
                </div>
                {chosenCategories != "" ? (
                    <ProgressGoal
                        chosenCategories={chosenCategories}
                        goal={companyMoneyGoal}
                        sum={dealsSum}
                        description={'Руб'}
                    />
                ) : null}
                {chosenCategories.length == 0 ? null : (
                    <div className="my-2 card">
                        <h6 className="card-header">Статистика по направлениям</h6>
                        <ul className="g-0 card-body list-group list-group-flush p-0">
                            {chosenCategories.map((category) => {
                                sum.current = dealsSum;
                                return (
                                    <ShowMoneyCategory
                                        key={category.id}
                                        category={category}
                                        dealsSum={dealsSum}
                                        addSum={(res) => {
                                            sum.current += res;
                                            setDealsSum(sum.current);
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
