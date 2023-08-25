import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  React.useEffect(() => {
    if (props.isOpen === true) {
      setName('');
      setLink('');
    }
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link
    });
  }

  return (
    <PopupWithForm
    title='Новое место'
    name='add-form'
    isOpen={props.isOpen}
    onClose={props.onClose}
    children
    onSubmit={handleSubmit}
    >
      <input
      className="popup__input"
      id="text-input-title"
      autoComplete="off"
      name="name"
      type="text"
      placeholder="Название"
      required
      value={name}
      minLength="2"
      maxLength="30"
      onChange={handleChangeName}
      />
      <span className="popup__error text-input-title-error"></span>
      <input
      className="popup__input"
      id="url-input"
      autoComplete="off"
      name="link"
      type="url"
      placeholder="Ссылка на картинку"
      required
      value={link}
      onChange={handleChangeLink}
      />
      <span className="popup__error url-input-error"></span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;