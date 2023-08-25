import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    if (props.isOpen === true) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <>
      <PopupWithForm
      title='Редактировать профиль'
      name='edit-form'
      isOpen={props.isOpen}
      onClose={props.onClose}
      children
      onSubmit={handleSubmit}
      >
        <input
        className="popup__input"
        id="text-input-name"
        autoComplete="off"
        name="nickName"
        type="text"
        placeholder="Имя"
        required
        value={name}
        minLength="2"
        maxLength="40"
        onChange={handleChangeName}
        />
        <span className="popup__error text-input-name-error"></span>
        <input
        className="popup__input"
        id="text-input-information"
        autoComplete="off"
        name="info"
        type="text"
        placeholder="О себе"
        required
        value={description}
        minLength="2"
        maxLength="200"
        onChange={handleChangeDescription}
        />
        <span className="popup__error text-input-information-error"></span>
      </PopupWithForm>
    </>
  );
};

export default EditProfilePopup;