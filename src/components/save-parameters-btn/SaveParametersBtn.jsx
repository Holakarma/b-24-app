import React from "react";
import { saveCompanyParameters } from "../../utils/saveCompanyParameters";

export function SaveParametersBtn({
    setCategoriesList,
    isChanged,
    setChanges,
    companyMoneyGoal,
    companyDealsGoal,
    companyProductsGoal,
    activeCategories,
    dashboard,
    setDashboards,
    error,
    setError,
    moneyStatistics,
    dealsStatistics,
    productsStatistics,
}) {
    const errorNotation = {
        noGoal: "Заполните цель",
        noCategories: "Выберите направления",
    };
    const [savedDialog, showSavedDialog] = React.useState(false);
    return (
        <div className="row g-0 gap-2 my-2">
            <button
                onClick={() => {
                    saveCompanyParameters(
                        setCategoriesList,
                        isChanged,
                        setChanges,
                        companyMoneyGoal,
                        companyDealsGoal,
                        companyProductsGoal,
                        activeCategories,
                        dashboard,
                        setDashboards,
                        showSavedDialog,
                        setError,
                        moneyStatistics,
                        dealsStatistics,
                        productsStatistics,
                    );
                }}
                type="button"
                className={`btn ${error ? "btn-danger" : "btn-success"} col-2`}>
                {error ? "Ошибка" : "Сохранить"}
            </button>
            {savedDialog ? (
                <div className="text-success col align-self-center">
                    Сохранено
                </div>
            ) : null}
            {error ? (
                <div className="text-danger col align-self-center">
                    {errorNotation[error]}
                </div>
            ) : null}
        </div>
    );
}
