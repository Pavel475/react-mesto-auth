import React from 'react';
import close from '../images/Close-Icon.svg';

function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_default">
        <form
        onSubmit={props.onSubmit}
        className={`popup__form popup__form_type_${props.name}`}
        name={props.name}
        >
          <h2 className="popup__container-heading">
            {props.title}
          </h2>
          {props.children}
          <button className="popup__container-button popup__container-button_type_save" type="submit">
            Сохранить
          </button>
          <button onClick={props.onClose} className="popup__close-button" type="button">
            <img src={close} alt="закрыть" className="popup__close-image" />
          </button>
        </form>
      </div>
    </div>
  );    
};

export default PopupWithForm;