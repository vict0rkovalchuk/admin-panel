import { createAction } from '@reduxjs/toolkit';

export const fetchHeroes = request => dispatch => {
  dispatch(heroesFetching());
  // request('http://localhost:3001/heroes')
  request(
    'https://my-json-server.typicode.com/vict0rkovalchuk/admin-panel/heroes'
  )
    .then(data => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()));
};

export const fetchFilters = request => dispatch => {
  dispatch(filtersFetching());
  // request('http://localhost:3001/filters')
  request(
    'https://my-json-server.typicode.com/vict0rkovalchuk/admin-panel/filters'
  )
    .then(data => dispatch(filtersFetched(data)))
    .catch(() => dispatch(filtersFetchingError()));
};

// export const heroesFetching = () => {
//   return {
//     type: 'HEROES_FETCHING'
//   };
// };

export const heroesFetching = createAction('HEROES_FETCHING');

// export const heroesFetched = heroes => {
//   return {
//     type: 'HEROES_FETCHED',
//     payload: heroes
//   };
// };

export const heroesFetched = createAction('HEROES_FETCHED');

export const heroesFetchingError = () => {
  return {
    type: 'HEROES_FETCHING_ERROR'
  };
};

export const deleteHero = id => {
  return {
    type: 'DELETE_HERO',
    payload: id
  };
};

export const addHero = hero => {
  return {
    type: 'ADD_HERO',
    payload: hero
  };
};

export const filtersFetching = () => {
  return {
    type: 'FILTERS_FETCHING'
  };
};

export const filtersFetched = heroes => {
  return {
    type: 'FILTERS_FETCHED',
    payload: heroes
  };
};

export const filtersFetchingError = () => {
  return {
    type: 'FILTERS_FETCHING_ERROR'
  };
};

export const activeFilterChanged = filter => {
  return {
    type: 'ACTIVE_FILTER_CHANGED',
    payload: filter
  };
};
