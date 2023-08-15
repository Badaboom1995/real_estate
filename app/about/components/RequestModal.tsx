'use client';
import React, { useState } from 'react';
import { RequestForm } from '@/components/RequestForm';
import { Modal } from '@/components/Modal';

const RequestModal = () => {
  const [isModalOpen, setIsOpen] = useState(false);
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <RequestForm
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </Modal>
  );
};

export default RequestModal;
