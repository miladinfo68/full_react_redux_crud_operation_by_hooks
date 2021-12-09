import { useState, useEffect } from 'react';
import './myModal.css';
const ConfModal = (props) => {

    const {title, cancled, confirmed ,children} = props;
    return (
        <div className="myModal animate__animated animate__zoomInDown">
            <div className="modalCenterBox ">
                    <span className="modalClose" onClick={cancled}>X</span>
                    <div className="modalTitle mt-3">
                        <h3 className="text-center">{title}</h3>
                    </div>
                    <div className="modalBody">
                        <h5 className="text-center mt-2">{children}</h5>
                    </div>
                    <div className="modalFooter">
                        <button onClick={confirmed} className="btn btn-success"> OK</button>
                    </div>

                </div>
        </div>
    )
}

export default ConfModal;