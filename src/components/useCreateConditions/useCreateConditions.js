import React from "react";

export function useCreateConditions() {
    const [dashBoardTitle, setDashBoardTitle] = React.useState('');
    const [status, setStatus] = React.useState('noErr');
    const [participants, setParticipants] = React.useState([]);

    const statusErr = {
        noErr: '',
        emptyField: 'Заполните Название',
        sameName: 'Такое название уже есть'
    }

    return {
        dashBoardTitle,
        setDashBoardTitle,
        status,
        setStatus,
        statusErr,
        participants,
        setParticipants
    }
}