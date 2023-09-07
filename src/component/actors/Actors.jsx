import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dataFail, dataLoad, dataSucc } from '../../store/actorsSlice'
import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Pagination, Skeleton, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'

const Actors = ({ lang }) => {
  const theme = useTheme()
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(1)
  const { actor } = useSelector(state => state.actor)
  const state = useSelector(state => state.actor)
  const dispatch = useDispatch()
  const handlePage = (e, p) => {
    setPages(p)
  }
  const getApi = useCallback(async () => {
    dispatch(dataLoad())
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/trending/person/day?language=${lang}`, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDgzZmQzZDhlNDRlNTUwYjdiODdiNGFiNmY2NGFiMCIsInN1YiI6IjY0ZGJmN2EzMzcxMDk3MDExYzUxY2U0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lbWI1cBSG2Za2GsRzMOVRqBmoOBn51Zh7l9Ga0TGe-o'
        },
        params: {
          page: pages,
        }
      })
      dispatch(dataSucc(res.data.results))
      setPage((prev) => prev + 1)
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
          </>
          :
          <>
            {
              actor.map((e) => {
                return (
                  <Card sx={{ maxWidth: 345, background: theme.palette.card.color }} key={e.id}>
                    <Link to={`/person/${e.id}`} style={{ color: 'black', textDecoration: 'none' }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="500"
                          image={e.profile_path ? `https://www.themoviedb.org/t/p/original${e.profile_path}` : 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'}
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div" textAlign="center">
                            {e.title ? e.title : e.name}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Link>
                  </Card>
                )
              })
            }
          </>
        }
      </Container>
      {actor.length > 0 ?
        <Pagination count={page} color="primary" onChange={handlePage} />
        : ""
      }
    </Box>
  )
}

export default Actors