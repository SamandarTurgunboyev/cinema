import { Link, Route, Routes } from 'react-router-dom';
import Home from './component/home/Home';
import Movies from './component/movies/Movies';
import Navbar from './component/navbar/Navbar';
import Filter from './component/filter/Filter';
import { AppBar, Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, ThemeProvider, Toolbar, createTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import TvShow from './component/tvshow/TvShow';
import Actors from './component/actors/Actors';
import Search from './component/search/Search';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { dataFail, dataLoad, dataSucc } from './store/searchSlice';
import LearnMore from './component/learnMore/LearnMore';
import './App.css';
import TvId from './component/tvShowLearn/TvId';
import ActorsLern from './component/actorsLern/ActorsLern';
import { grey } from '@mui/material/colors';

const themeLight = createTheme({
  palette: {
    background: {
      default: grey[100]
    },
    color: {
      color: 'black'
    },
    nav: {
      back: grey[100]
    },
    card: {
      color: '#c2c2c2'
    }
  }
});

const themeDark = createTheme({
  palette: {
    background: {
      default: "#323232"
    },
    color: {
      color: 'white'
    },
    nav: {
      back: "#323232"
    },
    card: {
      color: '#4c4c4c'
    }
  }
});

function App() {
  const [light, setLight] = useState(true);
  const [search, setSearch] = useState()
  const dispatch = useDispatch()
  const handleTheme = () => {
    setLight(!light)
  }
  const [lang, setLang] = useState('en-Us');

  const handleLang = (event) => {
    setLang(event.target.value);
  };
  const [filter, setFilter] = useState("movie")
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  const getSearch = useCallback(async () => {
    dispatch(dataLoad())
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/search/${filter}?query=${search}&include_adult=false&language=en-US&page=1`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDgzZmQzZDhlNDRlNTUwYjdiODdiNGFiNmY2NGFiMCIsInN1YiI6IjY0ZGJmN2EzMzcxMDk3MDExYzUxY2U0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lbWI1cBSG2Za2GsRzMOVRqBmoOBn51Zh7l9Ga0TGe-o'
        },
      })
      dispatch(dataSucc())
    } catch (error) {
      dispatch(dataFail())
    }
  }, [search, filter])
  useEffect(() => {
    getSearch()
  }, [getSearch])
  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <Navbar click={handleTheme} checked={light} OnLang={handleLang} lang={lang} />
      <Box component="main" sx={{ display: 'grid', gridTemplateColumns: { xs: "1fr", sm: '1fr 10fr', marginTop: '70px' } }}>
        <Filter />
        <Routes>
          <Route path='/' element={<Home lang={lang} />} />
          <Route path='/movies' element={<Movies lang={lang} />} />
          <Route path='/tv_show' element={<TvShow lang={lang} />} />
          <Route path='/actors' element={<Actors lang={lang} />} />
          <Route path='/search' element={<Search lang={lang} />} />
          <Route path="/movie/:id" element={<LearnMore lang={lang} />} />
          <Route path="/tv/:id" element={<TvId lang={lang} />} />
          <Route path="/person/:id" element={<ActorsLern lang={lang} />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
