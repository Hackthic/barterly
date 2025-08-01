import React, { useEffect } from 'react';
import { Notification, NotificationType } from '../context/NotificationContext';
import { XIcon } from './icons/XIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { ExclamationCircleIcon } from './icons/ExclamationCircleIcon';

interface ToastProps {
  notification: Notification;
  onDismiss: (id: string) => void;
}

const icons: Record<NotificationType, React.ReactNode> = {
  success: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
  error: <ExclamationCircleIcon className="h-6 w-6 text-red-500" />,
  info: <ExclamationCircleIcon className="h-6 w-6 text-blue-500" />,
};

const textColors: Record<NotificationType, string> = {
    success: 'text-green-800 dark:text-green-200',
    error: 'text-red-800 dark:text-red-200',
    info: 'text-blue-800 dark:text-blue-200',
};

const Toast: React.FC<ToastProps> = ({ notification, onDismiss }) => {
  const { id, message, type } = notification;

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id);
    }, 5000); // Auto-dismiss after 5 seconds

    return () => {
      clearTimeout(timer);
    };
  }, [id, onDismiss]);

  return (
    <div
      className={`max-w-sm w-full bg-white dark:bg-slate-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black dark:ring-slate-700 ring-opacity-5 overflow-hidden my-2 animate-fade-in-up`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {icons[type]}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className={`text-sm font-medium ${textColors[type]}`}>{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={() => onDismiss(id)}
              className="bg-transparent rounded-md inline-flex text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800"
            >
              <span className="sr-only">Close</span>
              <XIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;