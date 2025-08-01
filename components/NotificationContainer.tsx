import React from 'react';
import { useNotification } from './context/NotificationContext';
import Toast from './Toast';

const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div aria-live="assertive" className="fixed inset-0 flex flex-col items-end px-4 py-6 pointer-events-none sm:p-6 z-[100]">
      <div className="w-full max-w-sm">
        {notifications.map(notification => (
          <Toast
            key={notification.id}
            notification={notification}
            onDismiss={removeNotification}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationContainer;
