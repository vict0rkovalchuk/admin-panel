import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError
} from '../components/heroesList/heroesSlice';

import {
  filtersFetching,
  filtersFetched,
  filtersFetchingError
} from '../components/heroesAddForm/filtersSlice';

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
