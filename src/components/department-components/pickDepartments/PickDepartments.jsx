import React, { useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { getDepartmentList } from '../../../utils/getDepartmentList';

const PickDepartments = () => {
    const [allDepartmentList, setAllDepartmentList] = React.useState([]);
    const [selectedDepartmentList, setSelectedDepartmentLst] = React.useState(
        [],
    );

    const [isDepartmentLoading, setDepartmentLoading] = React.useState(false);

    useEffect(async () => {
        setDepartmentLoading(true);
        setAllDepartmentList(await getDepartmentList());
        setDepartmentLoading(false);
    }, []);

    return (
        <div>
            <DropdownButton
                title="Выбрать отделы"
                autoClose="outside"
            >
                <Dropdown.ItemText>
                    <b>Доступные отделы</b>
                </Dropdown.ItemText>
                <Dropdown.Divider />
                {isDepartmentLoading ? (
                    <div className="spinner-border">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    allDepartmentList.map((d) => (
                        <Dropdown.Item
                            as="button"
                            key={d.ID}
                            onClick={() => {
                                if (selectedDepartmentList.includes(d.ID)) {
                                    setSelectedDepartmentLst(
                                        selectedDepartmentList.filter(
                                            (s) => s !== d.ID,
                                        ),
                                    );
                                } else {
                                    setSelectedDepartmentLst([
                                        ...selectedDepartmentList,
                                        d.ID,
                                    ]);
                                }
                            }}
                            active={selectedDepartmentList.includes(d.ID)}
                        >
                            {d.NAME}
                        </Dropdown.Item>
                    ))
                )}
            </DropdownButton>
        </div>
    );
};

export default PickDepartments;
