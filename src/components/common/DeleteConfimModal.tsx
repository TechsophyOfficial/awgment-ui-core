import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export function DeleteConfirmModal(props) {
    return (
        <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>
                <div style={{ textAlign: 'center' }}>
                    <div
                        style={{
                            position: 'absolute',
                            display: 'inline-block',
                            padding: '20px',
                            background: '#fff',
                            borderRadius: '50%',
                            top: '-20px',
                            marginLeft: '-29px',
                        }}>
                        <FontAwesomeIcon icon={faTrashAlt} color="#d11a2a" size="lg" style={{ marginRight: '0px' }} />
                    </div>
                </div>

                <h5 style={{ textAlign: 'center', marginTop: '20px' }}>{props.message}</h5>
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: 'center', textAlign: 'center' }}>
                <Button className="" variant="secondary" onClick={props.onHide}>
                    No
                </Button>
                <Button className="" variant="danger" type="submit" onClick={() => props.handleSubmit()}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
