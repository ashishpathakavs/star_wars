import React, { useEffect, useState } from 'react';
import Character from '../../components/Character';
import Dropdown from '../../components/Dropdown';
import { fetchCharacters, getSpeciesList } from '../../services/api';
import { movies } from '../../constants';
import './CharacterList.css';
import { Pagination } from '@mui/material';

const CharcterList = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');
  const [species, setSpecies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchCharacters().then((data) => {
      setCharacters(data);
    });

    getSpeciesList().then((data) => {
      setSpecies(data);
    });
  }, []);

  const handleSelectedSpecies = (value) => {
    setSelectedSpecies(value);
  };

  const handleSelectedMovie = (value) => {
    setSelectedMovie(value);
  };

  const renderAllChaacters = (items) => {
    return items.slice((page - 1) * 10, page * 10).map((item) => {
      return (
        <Character
          key={item.name}
          item={item}
          filterSpecies={selectedSpecies}
          filterMovie={selectedMovie}
        />
      );
    });
  };

  return (
    <div className="home">
      {characters && (
        <div className="home__characters-container">
          <div className="home__characters-container__title">Characters</div>
          {renderAllChaacters(characters)}
          <Pagination
            className="home__characters-container__pagination"
            count={(characters.length / 10).toFixed(0)}
            onChange={(_, value) => {
              setPage(value);
            }}
          />
        </div>
      )}
      <div className="home__filter-container">
        <div className="filter-title">Filter</div>
        <Dropdown
          handleSelection={handleSelectedSpecies}
          menuItems={species}
          label="Species"
        />
        <Dropdown
          handleSelection={handleSelectedMovie}
          menuItems={movies}
          label="Episodes"
        />
      </div>
    </div>
  );
};

export default CharcterList;
