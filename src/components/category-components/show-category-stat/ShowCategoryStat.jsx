import React from "react";
import cls from "./ShowCategory.module.css";
import { ShowDealsCategory } from "../../show-deals-category/ShowDealsCategory";
import { ShowMoneyCategory } from "../../show-money-category/ShowMoneyCategory";
import { ShowProductsCategory } from "../../show-products-category/ShowProductsCategory";
import { ShowCallsCategory } from "../../show-calls-category/ShowCallsCategory";

export function ShowCategoryStat({
    chosenCategories,
    dealsSum,
    setDealsSum,
    countDeals,
    countCalls,
    setCountDeals,
    setCountCalls,
    countProducts,
    setCountProducts,
    usedStatistics,
    isStatUsed,
}) {
    const sum = React.useRef(0);
    const currentCountDeals = React.useRef(0);
    const currentCountProducts = React.useRef(0);
    const currentCountCalls = React.useRef(0);

    function toggleOpen() {
        setTimeout(BX24.fitWindow, 350);
    }

    return (
        <>
            {chosenCategories.length == 0 || !isStatUsed ? null : (
                <div className="my-4 card">
                    <h4 className="card-header">Детальная статистика</h4>
                    <ul className="card-body list-group list-group-flush px-0 py-0">
                        {chosenCategories.map((category) => {
                            sum.current = dealsSum;
                            currentCountDeals.current = countDeals;
                            currentCountProducts.current = countProducts;

                            return (
                                <li
                                    className={`row align-items-center mx-2 gx-3 py-2 ${cls.category}`}
                                    key={category.id}>
                                    <h6
                                        className={`${cls.heading} col-2 py-2 mb-0`}
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapseCategory${category.id}`}
                                        onClick={toggleOpen}>
                                        {category.name}
                                    </h6>
                                    <div
                                        className={`collapse col bg-body-tertiary rounded-4`}
                                        id={`collapseCategory${category.id}`}>
                                        {usedStatistics.MONEY ? (
                                            <ShowMoneyCategory
                                                category={category}
                                                dealsSum={dealsSum}
                                                addSum={(res) => {
                                                    sum.current += res;
                                                    setDealsSum(sum.current);
                                                }}
                                            />
                                        ) : null}
                                        {usedStatistics.DEALS ? (
                                            <ShowDealsCategory
                                                category={category}
                                                countDeals={countDeals}
                                                addCount={(res) => {
                                                    currentCountDeals.current +=
                                                        res;
                                                    setCountDeals(
                                                        currentCountDeals.current,
                                                    );
                                                }}
                                            />
                                        ) : null}
                                        {usedStatistics.PRODUCTS ? (
                                            <ShowProductsCategory
                                                category={category}
                                                countProducts={countProducts}
                                                addCount={(res) => {
                                                    currentCountProducts.current +=
                                                        res;
                                                    setCountProducts(
                                                        currentCountProducts.current,
                                                    );
                                                }}
                                            />
                                        ) : null}
                                        {usedStatistics.OUTGOING_CALLS ||
                                        usedStatistics.INCOMING_CALLS ||
                                        usedStatistics.GENERAL_CALLS ? (
                                            <ShowCallsCategory
                                                category={category}
                                                countCalls={countCalls}
                                                usedStatistics={usedStatistics}
                                                addCount={(res) => {
                                                    currentCountProducts.current +=
                                                        res;
                                                    setCountCalls(
                                                        currentCountCalls.current,
                                                    );
                                                }}
                                            />
                                        ) : null}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </>
    );
}
