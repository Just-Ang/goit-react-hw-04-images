import React from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = props => {
  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      props.onClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img src={props.value} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
