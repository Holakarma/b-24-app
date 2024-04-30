import React from "react";

export function ShowAvatar({user}) {
    const [isShowedName, showName] = React.useState(false);
    return (
        <div
            key={user.ID}
            style={{ width: 50 + "px" }}
            className="col position-relative">
            <img
                src={user.PERSONAL_PHOTO}
                onMouseEnter={() => {
                    showName(true);
                }}
                onMouseLeave={() => {
                    showName(false);
                }}
                className="border rounded-circle w-100 h-100"
            />
            {isShowedName ?
            <div className="card position-absolute p-1 px-2 z-1">
                {user.NAME} {user.LAST_NAME}
            </div>
             : null}
        </div>
    );
}
