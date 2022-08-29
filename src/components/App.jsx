import { Component } from 'react';
import { fetchImages } from 'services/fetchImages';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { SearchBar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    images: [],
    isLoding: false,
    query: '',
    page: 1,
    isModalOpen: false,
    modalImage: '',
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoding: true });
      fetchImages(this.state.query, this.state.page)
        .then(images => {
          this.setState(prev => ({
            images:
              this.state.page === 1 ? images : [...prev.images, ...images],
          }));
        })
        .catch(error => console.log(error))
        .finally(() => this.setState({ isLoding: false }));
    }
  }

  onSubmit = e => {
    e.preventDefault();
    this.setState({ query: e.target.elements.query.value, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  toggleModal = image => {
    if (image) {
      this.setState({ isModalOpen: true, modalImage: image });
      return;
    }
    this.setState({ isModalOpen: false, modalImage: '' });
  };

  render() {
    return (
      <div className="app">
        <SearchBar onSubmit={this.onSubmit} />
        <ImageGallery
          images={this.state.images}
          toggleModal={this.toggleModal}
        />
        {this.state.isLoding && <Loader />}
        {!!this.state.images.length && !this.state.isLoding && (
          <Button handleLoadMore={this.handleLoadMore} />
        )}
        {this.state.isModalOpen && (
          <Modal
            modalImage={this.state.modalImage}
            toggleModal={this.toggleModal}
          />
        )}
      </div>
    );
  }
}
