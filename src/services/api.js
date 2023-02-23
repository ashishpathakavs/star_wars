import axios from 'axios';

export const fetchCharacters = async () => {
  const results = await fetchAllPageData(
    'https://swapi.py4e.com/api/people/',
    1,
    true
  );
  return results;
};

const fetchAllPageData = async (url, page, next) => {
  if (!next) {
    return [];
  }
  const response = await axios.get(`${url}?page=${page}`);
  const results = await response.data.results;

  if (response.data.next !== null) {
    const temp = await fetchAllPageData(url, page + 1, next);
    results.push(...temp);
    return results;
  } else {
    fetchAllPageData(url, page + 1, false);
  }
  return results;
};

export const getSpeciesName = async (url) => {
  const { data } = await axios.get(url);
  if (data && data.name) {
    return data.name;
  }
};

export const getFilmNames = async (urls) => {
  const films = await axios.all(urls.map((url) => axios.get(url)));
  const filmData = films.map((film) => {
    return film.data;
  });

  const fimlNames = filmData.map((film) => `Episode ${film.episode_id}`);
  return fimlNames;
};

export const getSpaceshipNames = async (urls) => {
  const spaceships = await axios.all(urls.map((url) => axios.get(url)));
  const spaceshipData = spaceships.map((spaceship) => {
    return spaceship.data;
  });

  const spaceshipNames = spaceshipData.map((spaceship) => spaceship.name);
  return spaceshipNames;
};

export const getSpeciesList = async () => {
  const results = await fetchAllPageData(
    'https://swapi.py4e.com/api/species/',
    1,
    true
  );
  const species = results.map((result) => {
    return result.name;
  });
  return species;
};
