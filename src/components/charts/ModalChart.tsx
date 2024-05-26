import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {chartProps} from "../../features/utils/types";

function ModalChart({show, onHide, chart, title}: chartProps) {

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {chart}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


export default ModalChart;