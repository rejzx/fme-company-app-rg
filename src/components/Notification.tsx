import React from 'react';
import { Alert } from '@mui/material';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  return (
    <Alert severity={type} sx={{ width: '100%', mb: 2 }}>
      {message}
    </Alert>
  );
};

export default Notification;
