import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  getSpeciesName,
  getFilmNames,
  getSpaceshipNames,
} from '../../services/api';
import './Character.css';

const Character = ({ item, filterSpecies, filterMovie }) => {
  const [speciesName, setSpeciesName] = useState('');
  const [filmNames, setFilmNames] = useState([]);
  const [spaceshipNames, setSpaceshipNames] = useState([]);

  useEffect(() => {
    // species name
    if (item && item.species) {
      getSpeciesName(item.species).then((species) => {
        setSpeciesName(species);
      });
    }

    // movies name
    if (item && item.films) {
      getFilmNames(item.films).then((names) => {
        setFilmNames(names);
      });
    }

    //spaceshinmaes
    if (item && item.starships) {
      getSpaceshipNames(item.starships).then((names) => {
        setSpaceshipNames(names);
      });
    }
  }, [item]);

  const renderNames = (items) => {
    return items.map((item) => {
      return (
        <span className="item-contaner" key={item}>
          {item}
        </span>
      );
    });
  };

  const filterCondition =
    (speciesName === filterSpecies || filterSpecies === '') &&
    (filmNames.includes(filterMovie) || filterMovie === '');

  return (
    <>
      {filterCondition && (
        <div className="character-container">
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{item.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Name: {item.name}</Typography>

              <Typography>Species: {speciesName}</Typography>

              <Typography>Movies:{renderNames(filmNames)}</Typography>
              <Typography>Spaceships: {renderNames(spaceshipNames)}</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      )}
    </>
  );
};

export default Character;
