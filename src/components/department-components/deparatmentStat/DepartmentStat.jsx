import React from 'react';
import PickDepartments from '../pickDepartments/PickDepartments';
import DatePicker from '../../datepicker/DatePicker';

const DepartmentStat = (props) => {
    const [departmentList, setDepartmantList] = React.useState([]);

    const period = {}

    console.log(props);
    return (
        <div>
            <PickDepartments />
            <DatePicker />
        </div>
    );
};

export default DepartmentStat;
