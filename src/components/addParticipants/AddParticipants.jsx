import React from "react";

const urlParams = new URLSearchParams(window.location.search);
const baseUrl = `https://${urlParams.get("DOMAIN")}`;

export function AddParticipants({ participants, setParticipants }) {
    const [showedParticipants, setShowedParticipants] = React.useState([]);

    function showSelectDialog() {
        BX24.selectUsers(function (users) {
            let arParticipants = [];
            for (let user of users) {
                arParticipants.push(user.id);
            }
            setParticipants(arParticipants);
            setShowedParticipants(users);
            setTimeout(BX24.fitWindow, 10);
        });
    }

    return (
        <div>
            <button
                onClick={showSelectDialog}
                className="btn btn-secondary my-2 w-20 col-3">
                Изменить участников
            </button>
            <div>
                <div className="col row gap-2 g-0 mt-1">
                    {showedParticipants.map((p, id) => {
                        return (
                            (<div
                                className="col-4 border border-secondary border-start-0 ps-0 rounded"
                                key={id}>
                                <img
                                    src={`${baseUrl + p.photo}`}
                                    alt="photo"
                                    className="w-25 rounded me-2"
                                />
                                {p.name}
                            </div>)
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
