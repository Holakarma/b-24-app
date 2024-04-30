import React from "react";
import { ShowCategoryChoice } from "../show-categoiry-choice/ShowCategoryChoice";

export default function CategoriesPopup({
    setShowCategories,
    activeCategories,
    setActiveCategories,
    setError,
    setChanges,
    setDealsLoaded,
}) {
    return (
        <div className="card border-3 p-3 pt-4 my-2 position-absolute z-1">
            <button
                onClick={() => setShowCategories(false)}
                type="button"
                className="btn-close position-absolute top-0 end-0 mt-1 me-1"
                aria-label="Close"></button>
            Доступные воронки
            <ShowCategoryChoice
                activeCategories={activeCategories}
                setActiveCategories={setActiveCategories}
                setError={setError}
                setChanges={setChanges}
                setDealsLoaded={setDealsLoaded}
            />
        </div>
    );
}