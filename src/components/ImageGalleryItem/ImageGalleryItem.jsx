export const ImageGalleryItem = ({
  largeImageURL,
  webformatURL,
  toggleModal,
}) => (
  <li className="imageGalleryItem">
    <img
      className="imageGalleryItem-image"
      src={webformatURL}
      alt=""
      onClick={() => toggleModal(largeImageURL)}
    />
  </li>
);
