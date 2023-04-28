import { useHttp } from '../../hooks/http.hook';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  filtersFetching,
  filtersFetched,
  filtersFetchingError
} from '../../actions';

import { addHero } from '../../actions';

import { v4 as uuidv4 } from 'uuid';

import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [element, setElement] = useState('Я владею элементом...');

  const { filters, filtersLoadingStatus } = useSelector(state => state);
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(filtersFetching());
    request('http://localhost:3001/filters')
      .then(data => dispatch(filtersFetched(data)))
      .catch(() => dispatch(filtersFetchingError()));

    // eslint-disable-next-line
  }, []);

  const onInputChange = e => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'text':
        setText(e.target.value);
        break;
      case 'element':
        setElement(e.target.value);
        break;
      default:
        break;
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    const newHero = {
      id: uuidv4(),
      name,
      description: text,
      element
    };
    dispatch(addHero(newHero));
    request(`http://localhost:3001/heroes`, 'POST', JSON.stringify(newHero))
      .then(data => console.log(data, 'Posted'))
      .catch(err => console.log(err));
    setName('');
    setText('');
    setElement('Я владею элементом...');
  };

  //   const loader = filtersLoadingStatus === 'loading' ? <Spinner /> : null;
  const loader =
    filtersLoadingStatus === 'loading' ? (
      <option>Загрузка элементов</option>
    ) : null;
  const error =
    filtersLoadingStatus === 'error' ? <option>Ошибка загрузки</option> : null;

  let content;
  if (filters && filters.length > 0) {
    content = filters.map((item, i) => {
      if (item.value === 'all') {
        return;
      }

      return (
        <option key={i} value={item.value}>
          {item.name}
        </option>
      );
    });
  }

  return (
    <form onSubmit={onSubmit} className="border p-4 shadow-lg rounded">
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          value={name}
          onChange={onInputChange}
          required
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder="Как меня зовут?"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          value={text}
          onChange={onInputChange}
          required
          name="text"
          className="form-control"
          id="text"
          placeholder="Что я умею?"
          style={{ height: '130px' }}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          defaultValue={element}
          onChange={onInputChange}
          required
          className="form-select"
          id="element"
          name="element"
        >
          {loader}
          {error}
          {content}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
