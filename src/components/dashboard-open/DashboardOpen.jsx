import React, { useEffect } from "react";
import { DeleteDashboard } from "../delete-dashboard/DeleteDashboard";
import { ShowParticipants } from "../show-participants/ShowParticipants";
import { ChoiceCategory } from "../choice-category/ChoiceCategory";
import { getCategories } from "../../utils/createSavedCategories";
import { getUsers } from "../../utils/createSavedUsers";
import { getDeals } from "../../utils/createSavedDeals";
import { SaveParametersBtn } from "../save-parameters-btn/SaveParametersBtn";
import { ShowChosenCategory } from "../showChosenCategory/ShowChosenCategory";
import { MoneyStatistics } from "../money-statistics/MoneyStatistics";
import { DealsStatistics } from "../deals-statistics/DealsStatistics";
import { ProductsStatistics } from "../products-statistics/ProductsStatistics";

// BX24.callMethod('access.name', {ACCESS:['U3']}, function(res) {
//     console.log(res.data())
// });

export function DashboardOpen({
    dashboard,
    setDashboards,
    setOpenedDashboard,
}) {
    const usersList = dashboard.PROPERTY_VALUES.PARTICIPANTS_LIST;
    const [categoriesList, setCategoriesList] = React.useState(
        dashboard.PROPERTY_VALUES.CATEGORIES_LIST,
    );
    const startedMoneyGoal = dashboard.PROPERTY_VALUES.COMPANY_MONEY_GOAL;
    const startedDealsGoal = dashboard.PROPERTY_VALUES.COMPANY_DEALS_GOAL;
    const startedProductsGoal = dashboard.PROPERTY_VALUES.COMPANY_PRODUCTS_GOAL;
    const statistics = dashboard.PROPERTY_VALUES.USE_STATISTICS.split(",");

    const [activeCategories, setActiveCategories] = React.useState(
        categoriesList ? categoriesList.split(",") : [],
    );
    const [companyMoneyGoal, setCompanyMoneyGoal] = React.useState(
        startedMoneyGoal ? startedMoneyGoal : 0,
    );
    const [companyDealsGoal, setCompanyDealsGoal] = React.useState(
        startedDealsGoal ? startedDealsGoal : 0,
    );
    const [companyProductsGoal, setCompanyProductsGoal] = React.useState(
        startedProductsGoal ? startedProductsGoal : 0,
    );

    const [arParticipants, setArParticipants] = React.useState([]);
    const [chosenCategories, choseCategories] = React.useState([]);

    const [render, setRender] = React.useState(false);

    const [isDealsLoaded, setDealsLoaded] = React.useState(false);
    const loadedDeals = React.useRef([]);

    const [fetchedUsers, setFetchedUsers] = React.useState(false);
    const [fetchedCategories, setFetchedCateories] = React.useState(false);
    
    function updateDashboard() {
        function fetchParams(param) {
            switch (param) {
                case "users":
                    setFetchedUsers(true);
                    if (fetchedCategories) {
                        setRender(true);
                    }
                    break;
                case "categories":
                    setFetchedCateories(true);
                    if (fetchedUsers) {
                        setRender(true);
                    }
                    break;
            }
        }
        if (usersList != "") {
            getUsers(usersList.split(",")).then((result) => {
                setArParticipants(result);
                fetchParams("users");
            });
        } else {
            fetchParams("users");
        }
        if (categoriesList != "") {
            const arCategories = categoriesList.split(",");
            getCategories(arCategories).then((result) => {
                choseCategories(result);
                fetchParams("categories");
            });
            arCategories.forEach((categoryId) => {
                getDeals(parseInt(categoryId)).then((result) => {
                    loadedDeals.current.push(categoryId);
                    if (loadedDeals.current.length === arCategories.length) {
                        setDealsLoaded(true);
                    }
                });
            });
        } else {
            fetchParams("categories");
        }
    }
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            updateDashboard();
        }
        return () => {
            isMounted = false;
        };
    }, [usersList, categoriesList, fetchedUsers, fetchedCategories]);

    const [error, setError] = React.useState(false);
    const [isChanged, setChanges] = React.useState(false);

    const [moneyStatistics, setMoneyStatistics] = React.useState(
        statistics.includes("money") ? true : false,
    );
    const [dealsStatistics, setDealsStatistics] = React.useState(
        statistics.includes("deals") ? true : false,
    );
    const [productsStatistics, setProductsStatistics] = React.useState(
        statistics.includes("products") ? true : false,
    );

    return render ? (
        <>
            <div className={`card p-3 w-100`}>
                <div className="container pt-3 position-relative">
                    <button
                        onClick={() => setOpenedDashboard(undefined)}
                        type="button"
                        className="btn-close position-absolute end-0 top-0"
                        aria-label="Close"></button>
                    <h2 className="mb-4">
                        {dashboard.PROPERTY_VALUES.DASHBOARD_TITLE}
                    </h2>
                    <ChoiceCategory
                        activeCategories={activeCategories}
                        choseCategories={choseCategories}
                        setActiveCategories={setActiveCategories}
                        setError={setError}
                        setChanges={setChanges}
                    />
                    {chosenCategories.length == 0 ? null : (
                        <div className="card mb-2">
                            <h6 className="card-header">
                                Выбранные направления
                            </h6>
                            <ul className="card-body p-2 g-0 row gap-1 mb-0">
                                {chosenCategories.map((category) => {
                                    return (
                                        <ShowChosenCategory
                                            key={category.id}
                                            category={category}
                                        />
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                    <div className="form-check form-switch mb-2 mt-4">
                        <input
                            checked={moneyStatistics}
                            onChange={() => {
                                setMoneyStatistics(
                                    moneyStatistics ? false : true,
                                );
                                setChanges(true);
                            }}
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckDefault">
                            Использовать финансовую статистику
                        </label>
                    </div>

                    {moneyStatistics ? (
                        categoriesList === "" ? (
                            <p className="text-info">
                                Выберите направления для статистики и сохраните
                            </p>
                        ) : isDealsLoaded ? (
                            <MoneyStatistics
                                setError={setError}
                                companyMoneyGoal={companyMoneyGoal}
                                setCompanyMoneyGoal={setCompanyMoneyGoal}
                                setChanges={setChanges}
                                chosenCategories={chosenCategories}
                            />
                        ) : (
                            <div className="row g-0 justify-content-center">
                                <div className="spinner-border col-2">
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                                <p className="ms-3 mb-0 col align-self-center">
                                    Загрузка, подождите...
                                </p>
                            </div>
                        )
                    ) : null}

                    <div className="form-check form-switch mb-2 mt-3">
                        <input
                            checked={dealsStatistics}
                            onChange={() => {
                                setDealsStatistics(
                                    dealsStatistics ? false : true,
                                );
                                setChanges(true);
                            }}
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckDefault">
                            Использовать статистику сделок
                        </label>
                    </div>

                    {dealsStatistics ? (
                        categoriesList === "" ? (
                            <p className="text-info">
                                Выберите направления для статистики и сохраните
                            </p>
                        ) : isDealsLoaded ? (
                            <DealsStatistics
                                setError={setError}
                                companyDealsGoal={companyDealsGoal}
                                setCompanyDealsGoal={setCompanyDealsGoal}
                                setChanges={setChanges}
                                chosenCategories={chosenCategories}
                            />
                        ) : (
                            <div className="row g-0 justify-content-center">
                                <div className="spinner-border col-2">
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                                <p className="ms-3 mb-0 col align-self-center">
                                    Загрузка, подождите...
                                </p>
                            </div>
                        )
                    ) : null}

                    <div className="form-check form-switch mb-2 mt-3">
                        <input
                            checked={productsStatistics}
                            onChange={() => {
                                setProductsStatistics(
                                    productsStatistics ? false : true,
                                );
                                setChanges(true);
                            }}
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckDefault">
                            Использовать статистику по товарам
                        </label>
                    </div>

                    {productsStatistics ? (
                        categoriesList === "" ? (
                            <p className="text-info">
                                Выберите направления для статистики и сохраните
                            </p>
                        ) : isDealsLoaded ? (
                            <ProductsStatistics
                                setError={setError}
                                companyProductsGoal={companyProductsGoal}
                                setCompanyProductsGoal={setCompanyProductsGoal}
                                setChanges={setChanges}
                                chosenCategories={chosenCategories}
                            />
                        ) : (
                            <div className="row g-0 justify-content-center">
                                <div className="spinner-border col-2">
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                                <p className="ms-3 mb-0 col align-self-center">
                                    Загрузка, подождите...
                                </p>
                            </div>
                        )
                    ) : null}

                    {isChanged ? (
                        <SaveParametersBtn
                            setCategoriesList={setCategoriesList}
                            isChanged={isChanged}
                            setChanges={setChanges}
                            companyMoneyGoal={companyMoneyGoal}
                            companyDealsGoal={companyDealsGoal}
                            companyProductsGoal={companyProductsGoal}
                            activeCategories={activeCategories}
                            dashboard={dashboard}
                            setDashboards={setDashboards}
                            error={error}
                            setError={setError}
                            moneyStatistics={moneyStatistics}
                            dealsStatistics={dealsStatistics}
                            productsStatistics={productsStatistics}
                        />
                    ) : null}

                    {usersList === "" ? null : (
                        <ShowParticipants arParticipants={arParticipants} />
                    )}
                    <DeleteDashboard
                        dashboard={dashboard}
                        setDashboards={setDashboards}
                        setOpenedDashboard={setOpenedDashboard}
                    />
                </div>
            </div>
        </>
    ) : (
        <div className="row g-0 justify-content-center">
            <div className="spinner-border col-2">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="ms-3 mb-0 col align-self-center">
                Загрузка данных из CRM, подождите...
            </p>
        </div>
    );
}
