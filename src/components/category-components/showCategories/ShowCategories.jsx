import React from 'react';
import { ShowChosenCategory } from '../showChosenCategory/ShowChosenCategory';

export function ShowCategories({ chosenCategories }) {
    return (
        <>
            {(chosenCategories.length == 0 || !chosenCategories?.at(0)) ? null : (
                <div className="card">
                    <h6 className="card-header">Выбранные воронки</h6>
                    <div className="card-body">
                        <ul className="row row-cols-4 mb-0 p-0 g-2">
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
                </div>
            )}
        </>
    );
}
