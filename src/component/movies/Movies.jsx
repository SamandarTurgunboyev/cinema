import { useTheme } from '@emotion/react'
import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Pagination, Skeleton, Typography } from '@mui/material'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dataFail, dataLoad, dataSucc } from '../../store/dataSlice'
import { Link } from 'react-router-dom'

const Movies = ({ lang }) => {
  const theme = useTheme()
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(1)
  const { data } = useSelector(state => state.data)
  const state = useSelector(state => state.data)
  const dispatch = useDispatch()
  const handlePage = (e, p) => {
    setPages(p)
  }
  const getApi = useCallback(async () => {
    dispatch(dataLoad())
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?language=${lang}`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDgzZmQzZDhlNDRlNTUwYjdiODdiNGFiNmY2NGFiMCIsInN1YiI6IjY0ZGJmN2EzMzcxMDk3MDExYzUxY2U0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lbWI1cBSG2Za2GsRzMOVRqBmoOBn51Zh7l9Ga0TGe-o'
        },
        params: {
          page: pages
        }
      })
      setPage((prev) => prev + 1)
      dispatch(dataSucc(res.data.results))
    } catch (error) {
      setPage(2)
      setPages(1)
      dispatch(dataFail(error.message))
    }
  }, [pages, lang])
  useEffect(() => {
    getApi()
  }, [getApi])
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: "20px" }}>
      <Container sx={{ display: 'grid', justifyItems: 'center', gridTemplateColumns: { xs: "1fr", sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: '15px', mt: 3 }}>
        {state.isLoad ?
          <>
            <Skeleton variant="rectangular" width={345} height={345} />
            <Skeleton variant="rectangular" width={345} height={345} />
            <Skeleton variant="rectangular" width={345} height={345} />
            <Skeleton variant="rectangular" width={345} height={345} />
            <Skeleton variant="rectangular" width={345} height={345} />
            <Skeleton variant="rectangular" width={345} height={345} />
          </> :
          <>
            {data.map((e) => {
              return (
                <Card sx={{ maxWidth: 345, background: theme.palette.card.color }} key={e.id}>
                  {data.length > 0 ?
                    <Link to={`/movie/${e.id}`} style={{ color: 'black', textDecoration: 'none' }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          image={`https://www.themoviedb.org/t/p/original${e.poster_path}`}
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div" textAlign="center">
                            {e.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {e.overview.slice(0, 135)}....
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Link>
                    : <Skeleton variant="rectangular" width={210} height={118} />
                  }
                </Card>
              )
            })}
          </>
        }
      </Container>
      {data.length > 0 ?
        <Pagination count={page} color="primary" onChange={handlePage} />
        : ""
      }
    </Box>
  )
}

export default Movies