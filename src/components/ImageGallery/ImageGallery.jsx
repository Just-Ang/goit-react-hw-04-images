import { useState, useEffect } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { fetchImg } from 'components/fetchImg';
import PropTypes from 'prop-types';

export const ImageGallery = ({ photoName }) => {
  const [photo, setPhoto] = useState([]);
  const [modal, setModal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);



  const handleModal = value => {
    setModal(value);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onBtnClick = () => {
    setPage(page + 1);
  };

  const getImage = (photoName, page) => fetchImg(photoName, page).then(photos => {
        if (photos.hits.length === 0) { return setStatus('rejected');}

        setPhoto(pre => pre.concat(photos.hits));
        setTotalPage(Math.ceil(photos.totalHits / 12));
        setStatus('resolved');
      });


  useEffect(() => {
    if (!photoName) return

    setPhoto([]);
    setPage(1);
    setStatus('pending');

    getImage(photoName, 1);
  }, [photoName]);

  useEffect(() => {
    if (page === 1) return;

    setStatus('pending');
    getImage(photoName, page);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (status === 'pending' && photo.length === 0) { return <Loader visible />;
  }

  if (status === 'idle') {
    return (
      <h1
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        Enter a search query
      </h1>
    );
  }
  if (status === 'rejected') {
    return (
      <h1
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        Not found
      </h1>
    );
  }
  return (
    <div>
      <div className={css.ImageGallery}>
        <ImageGalleryItem
          photos={photo}
          onClick={handleModal}
          onClose={openModal}
        />
        {showModal && <Modal onClose={closeModal} value={modal}></Modal>}
      </div>
      {page < totalPage && <Button onClick={onBtnClick} />}
    </div>
  );}


ImageGallery.propTypes = {
  photoName: PropTypes.string.isRequired,
}
