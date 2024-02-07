import React, { useEffect } from "react";
import CategoriesPopup from "../categories-popup/CategoriesPopup";
import { getCategories } from "../../utils/createSavedCategories";

export function ChoiceCategory({
    activeCategories,
    choseCategories,
    setActiveCategories,
    setError,
    setChanges,
}) {
    const [showCategories, setShowCategories] = React.useState(false);
    setTimeout(BX24.fitWindow, 10);
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            getCategories(activeCategories).then((result) => {
                choseCategories(result);
            });
        }
        return () => {
            isMounted = false;
        };
    }, [activeCategories]);

    return (
        <div className="col-3 mb-3">
            <div className="dropdown position-relative">
                <button
                    onClick={() => {
                        setShowCategories(showCategories ? false : true);
                    }}
                    className="btn btn-secondary dropdown-toggle w-100"
                    type="button"
                    data-bs-toggle="dropdown">
                    Выбрать направления
                </button>
                {showCategories ? (
                    <CategoriesPopup
                        setShowCategories={setShowCategories}
                        activeCategories={activeCategories}
                        setActiveCategories={setActiveCategories}
                        setError={setError}
                        setChanges={setChanges}
                    />
                ) : null}
            </div>
        </div>
    );
}
