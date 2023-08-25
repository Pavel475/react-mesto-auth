import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import { apiAuthentification } from '../utils/apiAuthentification';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [headerUserEmail, setHeaderUserEmail] = React.useState('');
  const [infoTooltipText, setInfoTooltipText] = React.useState('');
  const navigate = useNavigate();

  function mapCards(cards) {
    return cards.map((card) => {
        return {
            _id: card._id,
            likes: card.likes,
            link: card.link,
            name: card.name,
            owner: card.owner
        };
    })
  }

  React.useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  React.useEffect(() => {
    api.getInitialCards()
    .then((cardsList) => {
      setCards(mapCards(cardsList));
    })
    .catch((err) => {console.log(err)});
  }, []);

  React.useEffect(() => {
    api.userInfo()
    .then((response) => {
      setCurrentUser(response);
    })
    .catch((err) => {console.log(err)});
  }, [])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {console.log(err)});
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((cards) => cards.filter((c) => c._id === card._id ? '' : c));
    })
    .catch((err) => {console.log(err)});
  }

  function handleUpdateUser({name, about}) {
    api.editProfileInfo(name, about)
    .then((response) => {
      setCurrentUser(response);
      setEditProfilePopupOpen(false);
    })
    .catch((err) => {console.log(err)});
  }

  function handleUpdateAvatar({avatar}) {
    api.updateAvatar(avatar)
    .then((response) => {
      setCurrentUser(response);
      setEditAvatarPopupOpen(false);
    })
    .catch((err) => {console.log(err)});
  }

  function handleAddPlaceSubmit({name, link}) {
    api.createCard(name, link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      setAddPlacePopupOpen(false);
    })
    .catch((err) => {console.log(err)});
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleInfoTooltipClick() {
    setIsInfoTooltipOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({
      cardLink: card.link,
      cardName: card.name,
    });
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleLoginTrue() {
    setLoggedIn(true);
  }

  function handleLoginFalse() {
    setLoggedIn(false);
  }

  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        apiAuthentification.getContent(jwt)
        .then((res) => {
          if (res) {
            forwardHeaderUserEmail(res.data.email);
            handleLoginTrue();
            navigate("/", {replace: true})
          }
        });
      }
    }
  }

  function handleRegister(data) {
    apiAuthentification.onRegister(data.password, data.email)
    .then((res) => {
      showSuccessfullyInfoTooltip();
      navigate('/sign-in', {replace: true});
    })
    .catch(err => showMistakeInfoTooltip());
  }

  function handleLogin(data) {
    apiAuthentification.onLogin(data.password, data.email)
    .then((data) => {
      if (data.token){
        handleLoginTrue();
        navigate('/', {replace: true});
      }
    })
    .catch(err => showMistakeInfoTooltip());
  }

  function forwardHeaderUserEmail(email) {
    setHeaderUserEmail(email);
  }

  function showSuccessfullyInfoTooltip() {
    handleInfoTooltipClick();
    setInfoTooltipText('Вы успешно зарегистрировались!');
  }

  function showMistakeInfoTooltip() {
    handleInfoTooltipClick();
    setInfoTooltipText('Что-то пошло не так! Попробуйте ещё раз.');
  }

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
        handleLoginFalse={handleLoginFalse}
        headerUserEmail={headerUserEmail}
        />
        <InfoTooltip
        infoTooltipText={infoTooltipText}
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        />
        <Routes>
          <Route path='/sign-in' element={
          <Login
          handleLogin={handleLogin}
          showMistakeInfoTooltip={showMistakeInfoTooltip}
          title='Вход'
          name='login'
          handleLoginTrue={handleLoginTrue}
          />}
          />
          <Route path='/sign-up' element={
          <Register
          handleRegister={handleRegister}
          title='Регистрация'
          name='Register'
          />}
          />
          <Route path='*' element={<Navigate to="/sign-in" replace={true} />} />
          <Route
          path='/'
          element={
          <ProtectedRouteElement
          element={Main}
          cards={cards}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          loggedIn={loggedIn}
          />
          }
          />
        </Routes>
        <Footer />
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
