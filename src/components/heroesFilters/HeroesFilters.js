import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { activeFilterChanged } from '../../actions';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
  const { filters, activeFilter } = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {/* <button className="btn btn-outline-dark active">Все</button> */}
          {filters.map((item, i) => (
            <button
              onClick={() => dispatch(activeFilterChanged(item.value))}
              key={i}
              //   className={`btn ${item.classNames}`}
              className={classNames('btn', `${item.classNames}`, {
                active: item.value === activeFilter
              })}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroesFilters;
