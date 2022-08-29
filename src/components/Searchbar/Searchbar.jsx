import { AiOutlineSearch } from 'react-icons/ai';

export const SearchBar = ({ onSubmit }) => (
  <header className="searchbar">
    <form className="searchForm" onSubmit={onSubmit}>
      <button type="submit" className="searchForm-button">
        <span className="searchForm-button-label">
          <AiOutlineSearch className="searchForm-button-search-icon" />
        </span>
      </button>

      <input
        className="searchForm-input"
        name="query"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  </header>
);
