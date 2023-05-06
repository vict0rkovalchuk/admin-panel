import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { activeFilterChanged } from '../../components/heroesAddForm/filtersSlice';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
  const { filters, activeFilter, filtersLoadingStatus } = useSelector(
    state => state.filters
  );
  const dispatch = useDispatch();

  const loader =
    filtersLoadingStatus === 'loading' ? (
      <div>Загрузка элементов...</div>
    ) : null;
  const error =
    filtersLoadingStatus === 'error' ? <div>Ошибка загрузки</div> : null;
  const content =
    filtersLoadingStatus === 'idle'
      ? filters.map(({ value, className, name }) => {
          return (
            <button
              onClick={() => dispatch(activeFilterChanged(value))}
              key={value}
              className={classNames('btn', `${className}`, {
                active: value === activeFilter
              })}
            >
              {name}
            </button>
          );
        })
      : null;

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {loader}
          {error}
          {content}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
