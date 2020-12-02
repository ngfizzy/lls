import React, { FC } from 'react'
import { Button, Modal, ModalProps } from 'react-bootstrap'

interface Props {
    children: React.ReactChild;
    title: string;
    show: boolean;
    size?: ModalProps["size"];
    handleClose: () => void;
}

export const GeneralModal: FC<Props> = ({
    title,
    show,
    handleClose,
    children,
    size
}) => (
      <Modal size={size}show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
        </Modal>
    );

