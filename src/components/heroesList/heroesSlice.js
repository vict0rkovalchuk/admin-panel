import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle'
};

export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', () => {
  const { request } = useHttp();
  return request(
    'https://my-json-server.typicode.com/vict0rkovalchuk/admin-panel/heroes'
  );
});

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    addHero: (state, action) => {
      state.heroes.push(action.payload);
    },
    deleteHero: (state, action) => {
      state.heroes = state.heroes.filter(item => item.id !== action.payload);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchHeroes.pending, state => {
        state.heroesLoadingStatus = 'loading';
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroes = action.payload;
        state.heroesLoadingStatus = 'idle';
      })
      .addCase(fetchHeroes.rejected, state => {
        state.heroesLoadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  }
});

const { actions, reducer } = heroesSlice;

export default reducer;
export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  addHero,
  deleteHero
} = actions;
