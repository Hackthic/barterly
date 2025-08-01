import { useRef, useEffect, useCallback } from 'react';

export const useFocusTrap = <T extends HTMLElement>(
  isOpen: boolean,
  onClose: () => void
) => {
  const ref = useRef<T>(null);

  const handleFocus = useCallback((e: KeyboardEvent) => {
    if (e.key !== 'Tab' || !ref.current) return;

    const focusableModalElements = ref.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select'
    );
    const firstElement = focusableModalElements[0];
    const lastElement = focusableModalElements[focusableModalElements.length - 1];

    if (!firstElement) return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }, []);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (!isOpen || !ref.current) return;

    const modal = ref.current;
    
    const focusableModalElements = modal.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select'
    );
    const firstElement = focusableModalElements[0];
    if (firstElement) {
      firstElement.focus();
    }

    document.addEventListener('keydown', handleFocus);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleFocus);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleFocus, handleEscape]);

  return ref;
};