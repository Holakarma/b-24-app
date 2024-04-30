import React, { useEffect } from "react";
import { getCategories } from "../../../utils/createSavedCategories";

export function ShowCategoryChoice({
    activeCategories,
    setActiveCategories,
    setError,
    setChanges,
    setDealsLoaded,
}) {
    const [arCategories, setArCategories] = React.useState([]);
    useEffect(() => {
        getCategories().then((result) => {
            setArCategories(result);
        });
    });
    function editActiveCategories(e) {
        const id = e.target.dataset.categoryId;
        const chosen = activeCategories.findIndex((actived) => actived == id);
        let arCopy = activeCategories.slice();
        if (chosen == -1) {
            arCopy.push(id);
        } else {
            arCopy.splice(chosen, 1);
        }
        setActiveCategories(arCopy);
        setError(false);
        setChanges(true);
        setDealsLoaded(false);
    }
    function isChosen(category) {
        const id = category.id;
        const isChosen = activeCategories?.findIndex(
            (actived) => actived == id,
        );
        return isChosen != -1 ? "active" : "";
    }
    return (
        <ul className="list-group mt-2">
            {arCategories.map((category) => {
                setTimeout(BX24.fitWindow, 10);
                return (
                    <li
                        onClick={editActiveCategories}
                        data-category-id={category.id}
                        key={category.id}
                        className={`list-group-item list-group-item-action ${isChosen(
                            category,
                        )}`}>
                        {category.name}
                    </li>
                );
            })}
        </ul>
    );
}
