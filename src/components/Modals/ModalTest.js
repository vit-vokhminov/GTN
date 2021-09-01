import React from "react";
import "./styleModals.css";

const ModalTest = ({ refModal }) => {
    return (
        <div id="modal-test" className="modal" ref={refModal}>
            <div className="modal-content">
                <div className="modal-form">
                    <p>TEST</p>
                    <p>TEST</p>
                    <p>TEST</p>
                    <p>TEST</p>
                    <p>TEST</p>
                    <p>TEST</p>
                    <p>TEST</p>
                    <p>TEST</p>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ModalTest);
