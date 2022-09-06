import { useEffect, useState } from 'react';
import { fetchImages } from 'services/fetchImages';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { SearchBar } from './Searchbar/Searchbar';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  let totalPages = 0;

  useEffect(() => {
    setIsLoding(true);
    fetchImages(query, page)
      .then(images => {
        setImages(prev =>
          page === 1 ? images.hits : [...prev, ...images.hits]
        );
        totalPages = images.totalHits;
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoding(false));
  }, [query, page]);

  const onSubmit = e => {
    e.preventDefault();
    setQuery(e.target.elements.query.value);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const toggleModal = image => {
    if (image) {
      setIsModalOpen(true);
      setModalImage(image);
      return;
    }
    setIsModalOpen(false);
    setModalImage('');
  };

  return (
    <div className="app">
      <SearchBar onSubmit={onSubmit} />
      <ImageGallery images={images} toggleModal={toggleModal} />
      {isLoding && <Loader />}
      {images.length > 0 && totalPages > 1 && !isLoding && (
        <Button handleLoadMore={handleLoadMore} />
      )}
      {isModalOpen && (
        <Modal modalImage={modalImage} toggleModal={toggleModal} />
      )}
    </div>
  );
};
