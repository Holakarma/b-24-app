import React from 'react';
import PickDepartments from '../pickDepartments/PickDepartments';

const DepartmentStat = (props) => {
    const [departmentList, setDepartmantList] = React.useState([]);
    return (
        <div>
            <PickDepartments />
        </div>
    );
};

export default DepartmentStat;
