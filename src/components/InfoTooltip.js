import React from 'react';
import close from '../images/Close-Icon.svg';
import successfully from '../images/Successfully.svg';
import mistake from '../images/Mistake.svg';

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_default">
        <img src={props.infoTooltipText === 'Вы успешно зарегистрировались!' ? successfully : mistake} alt="картинка" className="popup__image-result" />
        <h2 className="popup__container-text-result">
          {props.infoTooltipText}
        </h2>
        <button onClick={props.onClose} className="popup__close-button" type="button">
          <img src={close} alt="закрыть" className="popup__close-image" />
        </button>
      </div>
    </div>
  );    
};

export default InfoTooltip;