import React from 'react';
import close from '../images/Close-Icon.svg';

function ImagePopup(props) {
    return (
        <div className={`popup popup_image-open ${props.isOpen ? 'popup_opened' : ''}`}>
          <div className="popup__group popup__group_default">
            <img src={props.card.cardLink} className="popup__image" alt={props.card.cardName} />
            <h2 className="popup__text">
              {props.card.cardName}
            </h2>
            <button onClick={props.onClose} className="popup__close-button popup__close-button_type_image" type="button">
              <img src={close} alt="закрыть" className="popup__close-image" />
            </button>
          </div>
        </div>
    );
}

export default ImagePopup;