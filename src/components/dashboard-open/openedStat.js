import React from 'react';
import { CategoryStat } from '../category-components/category-stat/CategoryStat';
import DepartmentStat from '../department-components/deparatmentStat/DepartmentStat';
import EmployeeStat from '../employee-components/employeeStat/EmployeeStat';
import CustomizedStat from '../customized-components/customized-stat/CustomizedStat';

export const openedStat = {
    category: 'Воронки',
    department: 'Отделы',
    department: 'Отделы',
    employees: 'Сотрудники',
    customized: 'Настраиваемая статистика',
};

export function alias(pickedStat, props) {
    switch (pickedStat) {
        case openedStat.category:
            return <CategoryStat {...props} />;
        case openedStat.department:
            return <DepartmentStat {...props} />;
        case openedStat.employees:
            return <EmployeeStat {...props} />;
        case openedStat.customized:
            return <CustomizedStat {...props} />;
    }
}
