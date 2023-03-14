import React from 'react'
import { NotificationBarWrapper } from './NotificationBar.styles';

type Props = {
    notification: string
}

function NotificationBar({notification}:Props) {
  return (
    <NotificationBarWrapper>{notification}</NotificationBarWrapper>
  )
}

export default NotificationBar;