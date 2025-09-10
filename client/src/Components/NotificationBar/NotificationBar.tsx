import React from "react";

type Props = {
  notification: string;
};

function NotificationBar({ notification }: Props) {
  return (
    <div className="w-full bg-emerald-600 text-white">
      <div className="page-container">
        <p className="py-2 text-center text-sm">{notification}</p>
      </div>
    </div>
  );
}

export default NotificationBar;
