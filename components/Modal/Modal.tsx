import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactElement;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const closeModal = (e: any) => {
    onClose();
  };
  const clickOverlay = (e: any) => {
    e.target === e.currentTarget && onClose();
  };
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed grid place-content-center inset-0 bg-black bg-opacity-50"
            onClick={clickOverlay}
          >
            <div className="bg-white rounded shadow-lg relative">
              {children}
              <button
                className="absolute top-[32px] right-[32px]"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
