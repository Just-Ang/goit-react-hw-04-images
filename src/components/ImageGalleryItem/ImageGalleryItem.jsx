import { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ photos, onClick, onClose }) => {
  const [, setModal] = useState(null);

  return (
    <>
      {photos.map(({ id, webformatURL, largeImageURL }) => (
        <li
          className={css.ImageGalleryItem}
          onClick={evt => {
            setModal(largeImageURL);
            onClick(largeImageURL);
            onClose();
          }}
          key={id}
        >
          <img
            className={css.ImageGalleryItemImage}
            src={webformatURL}
            alt=""
          />
        </li>
      ))}
    </>
  );
};
ImageGalleryItem.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
