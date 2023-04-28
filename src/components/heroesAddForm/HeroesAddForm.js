import { useHttp } from '../../hooks/http.hook';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addHero } from '../../actions';

import { v4 as uuidv4 } from 'uuid';

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

  const dispatch = useDispatch();
  const { request } = useHttp();

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
          value={element}
          onChange={onInputChange}
          required
          className="form-select"
          id="element"
          name="element"
        >
          <option>Я владею элементом...</option>
          <option value="fire">Огонь</option>
          <option value="water">Вода</option>
          <option value="wind">Ветер</option>
          <option value="earth">Земля</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
