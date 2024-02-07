import React from "react";
import { AddCompanyGoal } from "../add-company-goal/AddCompanyGoal";
import { ShowProductsCategory } from "../show-products-category/ShowProductsCategory";
import { ProgressGoal } from "../progress-goal/ProgressGoal";

export function ProductsStatistics({
    setError,
    companyProductsGoal,
    setCompanyProductsGoal,
    setChanges,
    chosenCategories,
}) {
    const [countProducts, setCountProducts] = React.useState(0);
    const count = React.useRef(0);

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="mb-0">Cтатистика по товарам</h5>
            </div>
            <div className="card-body">
                <div className="row g-0">
                    <AddCompanyGoal
                        setError={setError}
                        companyGoal={companyProductsGoal}
                        setCompanyGoal={setCompanyProductsGoal}
                        setChanges={setChanges}
                        description={"Товаров"}
                    />
                </div>
                {chosenCategories.length != 0 ? (
                    <ProgressGoal
                        chosenCategories={chosenCategories}
                        goal={companyProductsGoal}
                        sum={countProducts}
                        description={"Товаров"}
                    /> 
                ) : null}
                {chosenCategories.length == 0 ? null : (
                    <div className="my-2 card">
                        <h6 className="card-header">Статистика по направлениям</h6>
                        <ul className="g-0 card-body list-group list-group-flush p-0">
                           {chosenCategories.map((category) => {
                                count.current = countProducts;
                                return (
                                    <ShowProductsCategory
                                        key={category.id}
                                        category={category}
                                        countProducts={countProducts}
                                        addCount={(res) => {
                                            count.current += res;
                                            setCountProducts(count.current);
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