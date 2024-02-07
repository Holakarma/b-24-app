import React from "react";

export function ShowChosenCategory({ category }) {
    setTimeout(BX24.fitWindow, 10);
    return (
        <li className="list-group-item col-3 border rounded p-2">
            <div className="text-center">{category.name}</div>
        </li>
    );
}
