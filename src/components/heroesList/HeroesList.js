import { useHttp } from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  deleteHero
} from '../../actions';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
  const { filteredHeroes, heroesLoadingStatus } = useSelector(state => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(heroesFetching());
    // request('http://localhost:3001/heroes')
    request(
      'https://my-json-server.typicode.com/vict0rkovalchuk/admin-panel/heroes'
    )
      .then(data => dispatch(heroesFetched(data)))
      .catch(() => dispatch(heroesFetchingError()));

    // eslint-disable-next-line
  }, []);

  const onDelete = useCallback(
    id => {
      // request(`http://localhost:3001/heroes/${id}`, 'DELETE')
      request(
        `https://my-json-server.typicode.com/vict0rkovalchuk/admin-panel/heroes/${id}`,
        'DELETE'
      )
        .then(data => console.log(data, 'Deleted'))
        .then(dispatch(deleteHero(id)))
        .catch(err => console.log(err));
    },
    [request]
  );

  if (heroesLoadingStatus === 'loading') {
    return <Spinner />;
  } else if (heroesLoadingStatus === 'error') {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = arr => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    return arr.map(({ id, ...props }) => {
      const duration = 500;

      return (
        <CSSTransition key={id} timeout={duration} classNames="csstransition">
          <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)} />
        </CSSTransition>
      );
    });
  };

  const elements = renderHeroesList(filteredHeroes);
  return <TransitionGroup component="ul">{elements}</TransitionGroup>;
};

export default HeroesList;
