import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { useState } from 'react';

export const App = () => {
  const [photoName, setPhotoName] = useState('');

  const handleFormSumit = value => {
    setPhotoName(value);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: 16,
        paddingBottom: 24,
      }}
    >
      <Searchbar onSubmit={handleFormSumit} />
      <ImageGallery photoName={photoName} />
    </div>
  );
};
