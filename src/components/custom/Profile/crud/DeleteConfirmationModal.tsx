import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  itemName?: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  itemName,
}) => {
  if (!isOpen) return null;

  const modalElement = (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-200 mx-auto">
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-700 text-center">
            {message}
            {itemName && <span className="font-semibold"> {itemName}</span>}
          </p>
        </div>
        <div className="px-6 py-4 flex justify-end space-x-3 border-t border-gray-200">
      
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalElement, document.body);
};

export default DeleteConfirmationModal;