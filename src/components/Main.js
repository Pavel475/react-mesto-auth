import React from 'react';
import pen from '../images/Vector.svg';
import plus from '../images/plus.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__image">
                    <img src={currentUser.avatar} alt="Тут должна быть ваша аватарка" className="profile__avatar" />
                    <img
                    onClick={props.onEditAvatar}
                    src={pen}
                    className="profile__pen"
                    alt='редактировать'
                    />
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <button onClick={props.onEditProfile} className="profile__edit-button" type="button">
                        <img className="profile__edit-image" alt="редактировать" src={pen} />
                    </button>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button onClick={props.onAddPlace} className="profile__add-button" type="button">
                    <img className="profile__add-image" alt="добавить" src={plus} />
                </button>
            </section>
            <section className="elements">
                <ul className="elements-list">
                    {
                        props.cards.map((card) => (
                            <Card
                            onCardDelete={props.onCardDelete}
                            onCardLike={props.onCardLike}
                            key={card._id}
                            likes={card.likes}
                            link={card.link}
                            name={card.name}
                            card={card}
                            onCardClick={props.onCardClick}
                            />
                        ))
                    }
                </ul>
            </section>
        </main>
    );
}

export default Main;