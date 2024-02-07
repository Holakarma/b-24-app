import React from "react";

export function AddCompanyGoal({
    setError,
    companyGoal,
    setCompanyGoal,
    setChanges,
    description,
}) {
    function changeHandler(e) {
        setError(false);
        setChanges(true);
        e.target.value = e.target.value.replace(/\-/g, "");
        setCompanyGoal(e.target.value);
    }

    return (
        <div className="row g-0 gap-2 col me-2">
            <div className="input-group col">
                <span
                    className="input-group-text"
                    id="basic-addon1">
                    Цель компании
                </span>
                <input
                    onChange={changeHandler}
                    type="number"
                    className="form-control"
                    placeholder="Общая цель компании"
                    value={companyGoal ? companyGoal : ""}
                />
                <span className="input-group-text">{description}</span>
            </div>
        </div>
    );
}
