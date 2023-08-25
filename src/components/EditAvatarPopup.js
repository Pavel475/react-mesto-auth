import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarInput = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarInput.current.value,
    });
  }

  React.useEffect(() => {
    if (props.isOpen === true) {
      avatarInput.current.value = '';
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
    title='Обновить аватар'
    name='avatar-form'
    isOpen={props.isOpen}
    onClose={props.onClose}
    children
    onSubmit={handleSubmit}
    >
      <input
      ref={avatarInput}
      className="popup__input"
      id="url-input-avatar"
      autoComplete="off"
      name="avatar"
      type="url"
      placeholder="Ссылка на картинку"
      required
      />
      <span className="popup__error url-input-avatar-error"></span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;