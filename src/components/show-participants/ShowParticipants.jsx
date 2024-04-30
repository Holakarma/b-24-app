import React from "react";

export function ShowParticipants({ arParticipants }) {

    return (
        <div className="card border-2 p-3 my-2">
            <h4>Участники</h4>
            {arParticipants.map((participant, id) => {
                setTimeout(BX24.fitWindow, 10);
                return (
                    <div
                        className="row gap-2 mt-1 g-0"
                        key={id}>
                        <img
                            src={participant.PERSONAL_PHOTO}
                            className="rounded-4 col-2 p-0"
                        />
                        <h6 className="col">{participant.NAME}</h6>
                    </div>
                );
            })}
        </div>
    );
}
