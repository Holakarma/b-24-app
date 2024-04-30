import React from "react";

export function ShowChosenCategory({ category }) {
    setTimeout(BX24.fitWindow, 10);
    return (
        <li className="list-group-item col border p-2 my-0">
            <div className="text-center">{category.name}</div>
        </li>
    );
}
