import React, { useEffect } from 'react';
import { ChoiceCategory } from '../../category-components/choice-category/ChoiceCategory';
import { getCategories } from '../../../utils/createSavedCategories';
import { getDeals } from '../../../utils/createSavedDeals';
import { SaveParametersBtn } from '../../save-parameters-btn/SaveParametersBtn';
import { MoneyStatistics } from '../../money-statistics/MoneyStatistics';
import { DealsStatistics } from '../../deals-statistics/DealsStatistics';
import { ProductsStatistics } from '../../products-statistics/ProductsStatistics';
import { CallsStatistics } from '../../calls-statistics/CallsStatistics';
import { ShowCategoryStat } from '../show-category-stat/ShowCategoryStat';
import { StatisticChecks } from '../../statisticChecks/StatisticChecks';
import { ShowCategories } from '../showCategories/ShowCategories';
import DatePicker from '../../datepicker/DatePicker';
import { PeriodContext } from '../../../utils/contexts';

// 8 - клиенты б24
// 0 - лиды
// 40 - холодные
/* BX24.callMethod(
    "voximplant.statistic.get",
    { FILTER: { "CALL_FAILED_CODE": "200", ">CALL_DURATION": 3, "CALL_TYPE": 1, ">CALL_START_DATE": "2024-01-01T15:10:31"  } },
    function (result) {
        console.log(result);
    },
); */

/* BX24.callMethod("entity.item.property.get", { ENTITY: "dashboards" }, (res) => {
    console.log(res.data());
}); */

/*
"entity.item.property.add",
        {
            ENTITY: `${entityId}`,
            PROPERTY: "COMPANY_PRODUCTS_GOAL",
            NAME: "company products goal",
            TYPE: "N",
        }, 
*/

export function CategoryStat({
    dashboard,
    fetchParams,
    setDashboards,
    render,
}) {
    const [chosenCategories, choseCategories] = React.useState([]);
    const [categoriesList, setCategoriesList] = React.useState(
        dashboard.PROPERTY_VALUES.CATEGORIES_LIST,
    );
    const [activeCategories, setActiveCategories] = React.useState(
        categoriesList ? categoriesList.split(',') : [],
    );

    const startedGoals = {
        MONEY: dashboard.PROPERTY_VALUES.CATEGORIES_MONEY_GOAL,
        DEALS: dashboard.PROPERTY_VALUES.CATEGORIES_DEALS_GOAL,
        PRODUCTS: dashboard.PROPERTY_VALUES.CATEGORIES_PRODUCTS_GOAL,
        CALLS: dashboard.PROPERTY_VALUES.CATEGORIES_CALLS_GOAL,
    };

    const statistics = dashboard.PROPERTY_VALUES.USE_STATISTICS.split(',');

    const [categoriesMoneyGoal, setCategoriesMoneyGoal] = React.useState(
        parseInt(startedGoals.MONEY) ? parseInt(startedGoals.MONEY) : 0,
    );
    const [categoriesDealsGoal, setCategoriesDealsGoal] = React.useState(
        parseInt(startedGoals.DEALS) ? parseInt(startedGoals.DEALS) : 0,
    );
    const [categoriesProductsGoal, setCategoriesProductsGoal] = React.useState(
        parseInt(startedGoals.PRODUCTS) ? parseInt(startedGoals.PRODUCTS) : 0,
    );
    const [categoriesCallsGoal, setCategoriesCallsGoal] = React.useState(
        parseInt(startedGoals.CALLS) ? parseInt(startedGoals.CALLS) : 0,
    );

    const [isDealsLoaded, setDealsLoaded] = React.useState(false);
    const loadedDeals = React.useRef([]);

    const [error, setError] = React.useState(false);
    const [isChanged, setChanges] = React.useState(false);

    const [usedStatistics, setStatistics] = React.useState({
        MONEY: statistics.includes('MONEY'),
        DEALS: statistics.includes('DEALS'),
        PRODUCTS: statistics.includes('PRODUCTS'),
        OUTGOING_CALLS: statistics.includes('OUTGOING_CALLS'),
        INCOMING_CALLS: statistics.includes('INCOMING_CALLS'),
        GENERAL_CALLS: statistics.includes('GENERAL_CALLS'),
    });

    useEffect(() => {
        let isMounted = true;
        if (categoriesList != '') {
            getCategories(activeCategories).then((result) => {
                if (isMounted) {
                    choseCategories(result);
                    activeCategories.forEach((categoryId) => {
                        getDeals(parseInt(categoryId)).then(() => {
                            if (isMounted) {
                                if (
                                    !loadedDeals.current.find(
                                        (loadedDeal) =>
                                            loadedDeal === categoryId,
                                    )
                                ) {
                                    loadedDeals.current.push(categoryId);
                                }
                                if (
                                    loadedDeals.current.length >=
                                    activeCategories.length
                                ) {
                                    setDealsLoaded(true);
                                }
                            }
                            fetchParams('categories');
                        });
                    });
                }
            });
        } else {
            fetchParams('categories');
        }
        return () => {
            isMounted = false;
        };
    }, [categoriesList, isDealsLoaded]);

    const [dealsSum, setDealsSum] = React.useState(0);
    const [countDeals, setCountDeals] = React.useState(0);
    const [countProducts, setCountProducts] = React.useState(0);
    const [countCalls, setCountCalls] = React.useState({
        outgoing: 0,
        incoming: 0,
        general: 0,
    });

    const [isStatUsed, setStatUsed] = React.useState(false);
    useEffect(() => {
        for (let key in usedStatistics) {
            if (usedStatistics[key]) {
                setStatUsed(true);
                return;
            }
        }
        setStatUsed(false);
    }, [usedStatistics]);

    const [period, setPeriod] = React.useState({
        dateStart: null,
        dateEnd: new Date(),
    });

    return (
        <>
            <ShowCategories chosenCategories={chosenCategories} />
            <div className="row mt-4 align-items-center">
                <div className="col-3">
                    <ChoiceCategory
                        activeCategories={activeCategories}
                        setActiveCategories={setActiveCategories}
                        choseCategories={choseCategories}
                        setError={setError}
                        setChanges={setChanges}
                        setDealsLoaded={setDealsLoaded}
                    />
                </div>
                <div className="col">
                    <DatePicker
                        period={period}
                        setPeriod={setPeriod}
                    />
                </div>
            </div>
            <StatisticChecks
                usedStatistics={usedStatistics}
                setStatistics={setStatistics}
                setChanges={setChanges}
            />
            {usedStatistics.MONEY ? (
                categoriesList === '' ||
                chosenCategories.length === 0 ? null : isDealsLoaded &&
                  render ? (
                    <MoneyStatistics
                        setError={setError}
                        categoriesMoneyGoal={categoriesMoneyGoal}
                        setCategoriesMoneyGoal={setCategoriesMoneyGoal}
                        setChanges={setChanges}
                        chosenCategories={chosenCategories}
                        dealsSum={dealsSum}
                    />
                ) : (
                    <div className="row my-4 g-0 justify-content-center">
                        <div className="spinner-border col-2">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="ms-3 mb-0 col align-self-center">
                            Загрузка, подождите...
                        </p>
                    </div>
                )
            ) : null}
            {usedStatistics.DEALS ? (
                categoriesList === '' ||
                chosenCategories.length === 0 ? null : isDealsLoaded ? (
                    <DealsStatistics
                        setError={setError}
                        categoriesDealsGoal={categoriesDealsGoal}
                        setCategoriesDealsGoal={setCategoriesDealsGoal}
                        setChanges={setChanges}
                        chosenCategories={chosenCategories}
                        countDeals={countDeals}
                    />
                ) : (
                    <div className="row my-4 g-0 justify-content-center">
                        <div className="spinner-border col-2">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="ms-3 mb-0 col align-self-center">
                            Загрузка, подождите...
                        </p>
                    </div>
                )
            ) : null}
            {usedStatistics.PRODUCTS ? (
                categoriesList === '' ||
                chosenCategories.length === 0 ? null : isDealsLoaded ? (
                    <ProductsStatistics
                        setError={setError}
                        categoriesProductsGoal={categoriesProductsGoal}
                        setCategoriesProductsGoal={setCategoriesProductsGoal}
                        setChanges={setChanges}
                        chosenCategories={chosenCategories}
                        countProducts={countProducts}
                    />
                ) : (
                    <div className="row my-4 g-0 justify-content-center">
                        <div className="spinner-border col-2">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="ms-3 mb-0 col align-self-center">
                            Загрузка, подождите...
                        </p>
                    </div>
                )
            ) : null}
            {/* {(usedStatistics.INCOMING_CALLS || usedStatistics.OUTGOING_CALLS || usedStatistics.GENERAL_CALLS) ? (
                (categoriesList === ''  || chosenCategories.length === 0 )? null : isDealsLoaded ? (
                    <CallsStatistics
                        setError={setError}
                        categoriesCallsGoal={categoriesCallsGoal}
                        setCategoriesCallsGoal={setCategoriesCallsGoal}
                        setChanges={setChanges}
                        chosenCategories={chosenCategories}
                        countCalls={countCalls}
                        usedStatistics={usedStatistics}
                    />
                ) : (
                    <div className="row my-4 g-0 justify-content-center">
                        <div className="spinner-border col-2">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="ms-3 mb-0 col align-self-center">
                            Загрузка, подождите...
                        </p>
                    </div>
                )
            ) : null} */}
            {isStatUsed &&
            (categoriesList === '' || chosenCategories.length === 0) ? (
                <p className="text-info">
                    Выберите воронки для статистики и сохраните
                </p>
            ) : null}

            {categoriesList === '' ||
            chosenCategories.length === 0 ? null : isDealsLoaded ? (
                <PeriodContext.Provider value={period}>
                    <ShowCategoryStat
                        chosenCategories={chosenCategories}
                        dealsSum={dealsSum}
                        setDealsSum={setDealsSum}
                        countDeals={countDeals}
                        countCalls={countCalls}
                        setCountDeals={setCountDeals}
                        countProducts={countProducts}
                        setCountProducts={setCountProducts}
                        setCountCalls={setCountCalls}
                        usedStatistics={usedStatistics}
                        isStatUsed={isStatUsed}
                    />
                </PeriodContext.Provider>
            ) : (
                <div className="row my-4 g-0 justify-content-center">
                    <div className="spinner-border col-2">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="ms-3 mb-0 col align-self-center">
                        Загрузка, подождите...
                    </p>
                </div>
            )}
            {isChanged ? (
                <SaveParametersBtn
                    setCategoriesList={setCategoriesList}
                    isChanged={isChanged}
                    setChanges={setChanges}
                    categoriesMoneyGoal={categoriesMoneyGoal}
                    categoriesDealsGoal={categoriesDealsGoal}
                    categoriesProductsGoal={categoriesProductsGoal}
                    categoriesCallsGoal={categoriesCallsGoal}
                    activeCategories={activeCategories}
                    dashboard={dashboard}
                    setDashboards={setDashboards}
                    error={error}
                    setError={setError}
                    usedStatistics={usedStatistics}
                />
            ) : null}
        </>
    );
}
