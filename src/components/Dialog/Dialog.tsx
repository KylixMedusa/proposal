import './styles.scss';

import React from 'react';

interface DialogProps {
  title: string;
  message?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const Dialog: React.FC<DialogProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Okay",
  cancelText = "Cancel",
}) => {
  return (
    <div className="dialogue">
      <div className="titlebar"></div>
      <div className="body">
        <div className="warning">{title}</div>
        {message && <div className="hint">{message}</div>}
        <div className="actions">
          {onCancel && (
            <button className="btn" onClick={onCancel}>
              {cancelText}
            </button>
          )}
          <button className="btn confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Dialog);
