import React from "react";

export function AddGoal({
    setError,
    goal,
    setGoal,
    setChanges,
    dimension,
    description,
}) {
    function changeHandler(e) {
        setError(false);
        setChanges(true);
        e.target.value.replace(/\-/g, "");
        setGoal(e.target.value);
    }



    return (
        <div className="row g-0 gap-2 col me-2">
            <div className="input-group col">
                <span
                    className="input-group-text"
                    id="basic-addon1">
                    {description}
                </span>
                <input
                    onChange={changeHandler}
                    type="number"
                    className="form-control"
                    placeholder="Общая цель компании"
                    value={goal ? goal : ""}
                />
                <span className="input-group-text">{dimension}</span>
            </div>
        </div>
    );
}
