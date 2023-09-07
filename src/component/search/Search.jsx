import { Box, Card, CardActionArea, CardContent, CardMedia, Container, FormControl, InputLabel, NativeSelect, Pagination, Skeleton, TextField, Typography, styled, useTheme } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dataFail, dataLoad, dataSucc } from '../../store/dataSlice'
import cinema from '../../assets/cinema.png'
import axios from 'axios'
import { Link } from 'react-router-dom'

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'black',
        border: 'none',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'black',
        border: 'none',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'black',
            height: '55px',
            border: 'none',
            borderBottom: '1px solid black'
        },
        '&:hover fieldset': {
            borderColor: 'black',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'black',
        },
    },
});

const Search = ({ lang }) => {
    const theme = useTheme()
    const [pages, setPages] = useState(1)
    const [page, setPage] = useState(2)
    const [filter, setFilter] = useState('movie')
    const { data } = useSelector(state => state.data)
    const state = useSelector(state => state.data)
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const handlePage = (e, p) => {
        setPages(p)
    }
    const getApi = useCallback(async () => {
        dispatch(dataLoad())
        try {
            if (search.length > 0) {

                const res = await axios.get(`https://api.themoviedb.org/3/search/${filter}?query=${search}&include_adult=false&language=${lang}&page=1`, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDgzZmQzZDhlNDRlNTUwYjdiODdiNGFiNmY2NGFiMCIsInN1YiI6IjY0ZGJmN2EzMzcxMDk3MDExYzUxY2U0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lbWI1cBSG2Za2GsRzMOVRqBmoOBn51Zh7l9Ga0TGe-o'
                    },
                    params: {
                        page: pages,
                    }
                })
                dispatch(dataSucc(res.data.results))
                if (res.data.results == 0) {
                    setPage(2)
                    setPages(1)
                } else {
                    setPage((p) => p + 1)
                }
            }
            else {

                const res = await axios.get(`https://api.themoviedb.org/3/trending/${filter}/day?language=${lang}&page=1`, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDgzZmQzZDhlNDRlNTUwYjdiODdiNGFiNmY2NGFiMCIsInN1YiI6IjY0ZGJmN2EzMzcxMDk3MDExYzUxY2U0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lbWI1cBSG2Za2GsRzMOVRqBmoOBn51Zh7l9Ga0TGe-o'
                    },
                    params: {
                        page: pages,
                    }
                })
                dispatch(dataSucc(res.data.results))
                if (res.data.results == 0) {
                    setPage(2)
                    setPages(1)
                } else {
                    setPage((p) => p + 1)
                }
            }
        } catch (error) {
            setPage(page)
            dispatch(dataFail(error.message))
        }
    }, [pages, lang, search, filter])
    useEffect(() => {
        getApi()
    }, [getApi])
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <Box sx={{ display: 'flex', flexDirection: {xs:'row', lg: 'column'}, justifyItems: 'flex-start', marginLeft: '40px', marginTop: '10px', gap: '30px' }}>
                <CssTextField sx={{ width: '100%', fontSize: '10px' }} label="Search" id="custom-css-outlined-input" onChange={(e) => setSearch(e.target.value)} />
                <FormControl sx={{ width: '30%' }} onChange={(e) => setFilter(e.target.value)}>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Filter
                    </InputLabel>
                    <NativeSelect
                        defaultValue={30}
                        inputProps={{
                            name: 'filter',
                            id: 'uncontrolled-native',
                        }}
                    >
                        <option value={"movie"}>Movie</option>
                        <option value={'person'}>Actors</option>
                        <option value={'tv'}>Tv</option>
                    </NativeSelect>
                </FormControl>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: "20px" }}>
                <Container sx={{ display: 'grid', justifyItems: 'center', gridTemplateColumns: { xs: "1fr", sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: '15px' }}>
                    {state.isLoad ?
                        <>
                            <Skeleton variant="rectangular" width={345} height={345} />
                            <Skeleton variant="rectangular" width={345} height={345} />
                            <Skeleton variant="rectangular" width={345} height={345} />
                            <Skeleton variant="rectangular" width={345} height={345} />
                            <Skeleton variant="rectangular" width={345} height={345} />
                            <Skeleton variant="rectangular" width={345} height={345} />
                        </>
                        :
                        <>
                            {
                                data.map((e) => {
                                    return (
                                        <Link to={`/${filter}/${e.id}`} style={{ color: 'black', textDecoration: 'none' }}>
                                            <Card sx={{ maxWidth: 345, background: theme.palette.card.color }} key={e.id}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height={400}
                                                        image={filter == 'movie' ? e.poster_path ? `https://www.themoviedb.org/t/p/original${e.poster_path}` : cinema : filter == "person" ? e.profile_path ? `https://www.themoviedb.org/t/p/original${e.profile_path}` : 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg' : filter == 'tv' ? e.backdrop_path ? `https://www.themoviedb.org/t/p/original${e.backdrop_path}` : cinema : ''}
                                                        alt="green iguana"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div" textAlign="center">
                                                            {e.title ? e.title : e.name}
                                                        </Typography>
                                                        {e.overview &&
                                                            <Typography variant="body2" color="text.secondary">
                                                                {e.overview.slice(0, 135)}....
                                                            </Typography>
                                                        }
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Link>
                                    )
                                })
                            }
                        </>
                    }
                </Container>
                <Pagination count={page} color="primary" onChange={handlePage} />
            </Box>
        </Box >
    )
}

export default Search