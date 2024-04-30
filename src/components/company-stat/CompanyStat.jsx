import React from "react";

export function CompanyStat() {

    return <>
                        {chosenCategories.length == 0 ? null : (
                            <div className="card mt-4">
                                <h6 className="card-header">
                                    Выбранные воронки
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
                        <ChoiceCategory
                            activeCategories={activeCategories}
                            choseCategories={choseCategories}
                            setActiveCategories={setActiveCategories}
                            setError={setError}
                            setChanges={setChanges}
                        />
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
                                    Выберите направления для статистики и
                                    сохраните
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
                                    Выберите направления для статистики и
                                    сохраните
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
                                    Выберите направления для статистики и
                                    сохраните
                                </p>
                            ) : isDealsLoaded ? (
                                <ProductsStatistics
                                    setError={setError}
                                    companyProductsGoal={companyProductsGoal}
                                    setCompanyProductsGoal={
                                        setCompanyProductsGoal
                                    }
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
                    </>;
}