import React, { useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const PickCategories = ({
    activeCategories,
    setActiveCategories,
    choseCategories,
    setError,
    setChanges,
}) => {
    const [allCategoriesList, setAllCategoriesList] = React.useState([]);
    const [selectedCategoriesList, setSelectedCategoriesList] = React.useState(
        [],
    );

    const [isLoading, setLoading] = React.useState(false);

    useEffect(async () => {
        setLoading(true);
        setLoading(false);
    }, []);

    return (
        <div>
            <DropdownButton
                title="Выбрать воронки"
                autoClose="outside"
            >
                <Dropdown.ItemText>
                    <b>Доступные воронки</b>
                </Dropdown.ItemText>
                <Dropdown.Divider />
                {isLoading ? (
                    <div className="spinner-border">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    allCategoriesList.map((d) => (
                        <Dropdown.Item
                            as="button"
                            key={d.ID}
                            onClick={() => {
                                if (selectedCategoriesList.includes(d.ID)) {
                                    setSelectedCategoriesList(
                                        selectedCategoriesList.filter(
                                            (s) => s !== d.ID,
                                        ),
                                    );
                                } else {
                                    setSelectedCategoriesList([
                                        ...selectedCategoriesList,
                                        d.ID,
                                    ]);
                                }
                            }}
                            active={selectedCategoriesList.includes(d.ID)}
                        >
                            {d.NAME}
                        </Dropdown.Item>
                    ))
                )}
            </DropdownButton>
        </div>
    );
};

export default PickCategories;
