import React from 'react';
import trash from '../images/trash.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__group-button ${isLiked && 'element__group-button_active'}`
    );

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleClick() {
        props.onCardClick(props.card);
    } 

    return (
        <li className="element">
            <img
            src={props.link}
            className="element__mask-group"
            onClick={handleClick}
            alt={props.name}
            />
            <div className="element__info">
                <h2 className="element__text">
                    {props.name}
                </h2>
                <div className="element__group">
                    <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button">
                    </button>
                    <p className="element__group-text">
                        {props.likes.length}
                    </p>
                </div>
            </div>
            {isOwn &&
            <button onClick={handleDeleteClick} className="element__trash-button" type="reset">
                <img src={trash} alt="удалить" className="element__trash-image" />
            </button>
            }
        </li>
    );
}

export default Card;