import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { FloatLabel } from 'primereact/floatlabel';
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';

const DatePicker = ({ period, setPeriod }) => {
    const [isEnable, setEnable] = useState(false);
    return (
        <div className="row align-items-center">
            {isEnable ? (
                <div className="row col">
                    <div className="col">
                        <FloatLabel>
                            <Calendar
                                inputId="date_start"
                                showButtonBar
                                value={period.dateStart}
                                onChange={(e) =>
                                    setPeriod({ ...period, dateStart: e.value })
                                }
                                locale="ru"
                                dateFormat="dd/mm/yy, D"
                            />
                            <label htmlFor="date_start">Дата начала</label>
                        </FloatLabel>
                    </div>
                    <div className="col">
                        <FloatLabel>
                            <Calendar
                                inputId="date_end"
                                showButtonBar
                                value={period.dateEnd}
                                onChange={(e) =>
                                    setPeriod({ ...period, dateEnd: e.value })
                                }
                                locale="ru"
                                dateFormat="dd/mm/yy, D"
                            />
                            <label htmlFor="date_end">Дата конца</label>
                        </FloatLabel>
                    </div>
                </div>
            ) : null}
            <ins
                className="col"
                onClick={() => {
                    setEnable(!isEnable);
                }}
                style={{ cursor: 'pointer' }}
            >
                {isEnable ? 'Скрыть' : 'Показать'} фильтр по датам
            </ins>
        </div>
    );
};

export default DatePicker;
