import 'react-multi-carousel/lib/styles.css';
import React, { useCallback, useEffect, useState } from 'react'
import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Modal, Typography } from '@mui/material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadActor, loadImg, loadSucc } from '../../store/idSlice';
import { useTheme } from '@emotion/react';
import { BsArrowRightShort, BsArrowLeftShort } from 'react-icons/bs'

const ActorsLern = ({ lang }) => {
    const theme = useTheme()
    const { id } = useParams()
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.idData)
    const { img } = useSelector(state => state.idData)
    console.log(img, "img");
    const { actors } = useSelector(state => state.idData)
    const getApi = useCallback(async () => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/person/${id}?language=${lang}`, {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDgzZmQzZDhlNDRlNTUwYjdiODdiNGFiNmY2NGFiMCIsInN1YiI6IjY0ZGJmN2EzMzcxMDk3MDExYzUxY2U0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lbWI1cBSG2Za2GsRzMOVRqBmoOBn51Zh7l9Ga0TGe-o'
                },
            })
            const actor = await axios.get(`https://api.themoviedb.org/3/person/${id}/combined_credits?language=${lang}`, {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDgzZmQzZDhlNDRlNTUwYjdiODdiNGFiNmY2NGFiMCIsInN1YiI6IjY0ZGJmN2EzMzcxMDk3MDExYzUxY2U0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lbWI1cBSG2Za2GsRzMOVRqBmoOBn51Zh7l9Ga0TGe-o'
                },
            })
            const image = await axios.get(`https://api.themoviedb.org/3/person/${id}/images`, {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDgzZmQzZDhlNDRlNTUwYjdiODdiNGFiNmY2NGFiMCIsInN1YiI6IjY0ZGJmN2EzMzcxMDk3MDExYzUxY2U0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lbWI1cBSG2Za2GsRzMOVRqBmoOBn51Zh7l9Ga0TGe-o'
                },
            })
            dispatch(loadSucc(res.data))
            dispatch(loadActor(actor.data))
            console.log(actor.data);
            dispatch(loadImg(image.data.profiles))
        } catch (error) {
        }
    }, [id], [lang])

    useEffect(() => {
        getApi()
    }, [getApi])

    const [modalImg, setModelImg] = useState()

    const [open, setOpen] = React.useState(false);
    const handleOpen = (img) => {
        setOpen(true)
        setModelImg(`https://www.themoviedb.org/t/p/original${img}`)
    };
    const handleClose = () => setOpen(false);

    function SampleNextArrow(props) {
        const { onClick } = props;
        return (
            <div
                style={{ position: 'absolute', top: "960px", display: "block", right: "50px", background: "#646464", width: "40px", display: "flex", justifyContent: 'center', alignItems: 'center' }}
                onClick={onClick}
            >
                <BsArrowRightShort style={{ color: theme.palette.color.color, fontSize: "36px" }} />
            </div>
        );
    }

    function SamplePrevArrow(props) {
        const { onClick } = props;
        return (
            <div
                style={{ position: 'absolute', top: "960px", right: "100px", display: "block", background: "#646464", width: "40px", display: "flex", justifyContent: 'center', alignItems: 'center' }}
                onClick={onClick}
            >
                <BsArrowLeftShort style={{ color: 'white', fontSize: "36px" }} />
            </div>
        );
    }
    const settingI = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: img?.length === 1 ? 1 : 3,
        slidesToScroll: 3,
        centerMode: false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: img?.length === 1 ? 1 : 2,
                    slidesToScroll: 2,
                    centerMode: false,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    dots: false,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    dots: false,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    };
    const setting = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: actors?.cast?.length === 1 ? 1 : 3,
        slidesToScroll: 3,
        centerMode: false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: actors?.cast?.length === 1 ? 1 : 2,
                    slidesToScroll: 2,
                    centerMode: false,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    dots: false,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    dots: false,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    }

    return (
        <Box sx={{ display: "flex", flexDirection: 'column' }} >
            <Container fixed sx={{ display: 'grid', gridTemplateColumns: { md: '1fr', lg: '1fr 1fr' } }}>
                <Card sx={{ maxWidth: 500, height: '800px', background: theme.palette.card.color }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            image={`https://www.themoviedb.org/t/p/original${data.profile_path}`}
                            alt="green iguana"
                        />
                    </CardActionArea>
                </Card>
                <Card sx={{ maxWidth: "100%", background: theme.palette.card.color, minHeight: '700px' }}>
                    <CardActionArea>
                        <CardContent>
                            <ul>
                                <Typography variant='h6'>
                                    Name: <Typography component='span' variant='subtitle1'>{data.name}</Typography>
                                </Typography>
                                <Typography variant='h6'>
                                    Jobs: <Typography component='Typography' variant='subtitle1'>{data.known_for_department}</Typography>
                                </Typography>
                                {data.birthday &&
                                    <Typography variant='h6'>
                                        Birthday: <Typography component='span' variant='subtitle1'>{data.birthday}</Typography>
                                    </Typography>
                                }
                                {data.place_of_birth &&
                                    <Typography variant='h6'>
                                        Place of birth: <Typography component='span' variant='subtitle1'>{data.place_of_birth}</Typography>
                                    </Typography>
                                }
                                {data.deathday &&
                                    <Typography variant='h6'>
                                        Deathday: <Typography component='span' variant='subtitle1' style={{ paddingLeft: '15px' }}>{data.deathday}</Typography>
                                    </Typography>
                                }
                                {data.biography &&
                                    <Typography variant='h6'>
                                        Biography: <Typography component='span' variant='subtitle1'>{data.biography}</Typography>
                                    </Typography>
                                }
                            </ul>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Container>
            <Container>
                <Slider {...setting}>
                    {actors.cast?.map((e) => {
                        return (
                            <Card sx={{ width: "100%", marginTop: "100px", paddingLeft: '20px', background: "#646464" }}>
                                <Link to={`/movie/${e.id}`} style={{ color: 'black', textDecoration: 'none' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height='300px'
                                            image={e.backdrop_path ? `https://www.themoviedb.org/t/p/original${e.backdrop_path}` : 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg' ? e.poster_path ? `https://www.themoviedb.org/t/p/original${e.poster_path}` : 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg' : ""}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {e.original_title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <ul>
                                                    <Typography>
                                                        {e.character.slice(0, 30)}...
                                                    </Typography>
                                                </ul>
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Link>
                            </Card>
                        )
                    })}
                </Slider>
            </Container>
            <Container sx={{ display: 'grid', gridTemplateColumns: "1fr" }}>
                <Slider {...settingI}>
                    {img.map((e) => {
                        return (
                            <Card onClick={() => handleOpen(e.file_path)} sx={{ width: "100%", marginTop: "100px", paddingLeft: '20px', background: "#646464" }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image={e.file_path ? `https://www.themoviedb.org/t/p/original${e.file_path}` : 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'}
                                        alt="green iguana"
                                    />
                                </CardActionArea>
                            </Card>
                        )
                    })}
                </Slider>
            </Container>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "40%",
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                }}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                image={modalImg}
                                alt="green iguana"
                            />
                        </CardActionArea>
                    </Card>
                </Box>
            </Modal>
        </Box >
    );
}

export default ActorsLern