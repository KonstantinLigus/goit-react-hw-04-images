import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { SearchBar } from './Searchbar/Searchbar';

export class App extends Component {
  render() {
    return (
      <>
        <SearchBar />
        <Loader />
        <ImageGallery />
        <Button />
        <Modal />
      </>
    );
  }
}
