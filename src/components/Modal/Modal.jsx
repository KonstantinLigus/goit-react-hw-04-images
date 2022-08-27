export const Modal = ({ modalImage, toggleModal }) => (
  <div className="overlay" onClick={() => toggleModal()}>
    <div className="modal">
      <img src={modalImage} alt="" />
    </div>
  </div>
);
