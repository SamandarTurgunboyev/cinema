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
import './learn.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    minHeight: "10%",
    bgcolor: 'background.paper',
    boxShadow: 24,
};

const LearnMore = ({ lang }) => {
    const theme = useTheme()
    const { id } = useParams()
    const dispatch = useDispatch()
    const { data } = useSelector(state => state.idData)
    const { img } = useSelector(state => state.idData)
    const { actors } = useSelector(state => state.idData)
    const getApi = useCallback(async () => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=${lang}`, {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDgzZmQzZDhlNDRlNTUwYjdiODdiNGFiNmY2NGFiMCIsInN1YiI6IjY0ZGJmN2EzMzcxMDk3MDExYzUxY2U0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lbWI1cBSG2Za2GsRzMOVRqBmoOBn51Zh7l9Ga0TGe-o'
                },
            })
            const actor = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?language=${lang}`, {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDgzZmQzZDhlNDRlNTUwYjdiODdiNGFiNmY2NGFiMCIsInN1YiI6IjY0ZGJmN2EzMzcxMDk3MDExYzUxY2U0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lbWI1cBSG2Za2GsRzMOVRqBmoOBn51Zh7l9Ga0TGe-o'
                },
            })
            const image = await axios.get(`https://api.themoviedb.org/3/movie/${id}/images`, {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDgzZmQzZDhlNDRlNTUwYjdiODdiNGFiNmY2NGFiMCIsInN1YiI6IjY0ZGJmN2EzMzcxMDk3MDExYzUxY2U0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lbWI1cBSG2Za2GsRzMOVRqBmoOBn51Zh7l9Ga0TGe-o'
                },
            })
            console.log(image);
            dispatch(loadSucc(res.data))
            dispatch(loadActor(actor.data))
            dispatch(loadImg(image.data.backdrops))
        } catch (error) {
            console.log(error);
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
                <BsArrowRightShort style={{ color: 'white', fontSize: "36px" }} />
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
    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        arrows: false
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
    };

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

    return (
        <Box sx={{ display: "flex", flexDirection: 'column' }}>
            <Container fixed sx={{ display: 'grid', gridTemplateColumns: { md: '1fr', lg: '1fr 1fr' } }}>
                <Slider {...settings} style={{ width: "100%" }}>
                    <Card sx={{ maxWidth: 500, background: theme.palette.card.color }}>
                        <CardActionArea>
                            <CardMedia
                                width='500'
                                height='700'
                                component="img"
                                image={`https://www.themoviedb.org/t/p/original${data.poster_path}`}
                                alt="green iguana"
                            />
                        </CardActionArea>
                    </Card>
                    <Card sx={{ maxWidth: 700, background: theme.palette.card.color }}>
                        <CardActionArea>
                            <CardMedia
                                sx={{ height: '700px', objectFit: 'contain', background: 'black' }}
                                component="img"
                                image={`https://www.themoviedb.org/t/p/original${data.backdrop_path}`}
                                alt="green iguana"
                            />
                        </CardActionArea>
                    </Card>
                </Slider>
                <Card sx={{ maxWidth: "100%", background: theme.palette.card.color, minHeight: '700px' }}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {data.original_title}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                {data.overview}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <ul>
                                <Typography variant='h6'>Budget: <Typography component='Typography' variant='subtitle1'>${data.budget}</Typography></Typography>
                                <Typography variant='h6'>Genres: {data.genres?.map((e) => {
                                    return <Typography component='span' variant='subtitle1' style={{ paddingLeft: '15px' }}>{e.name}</Typography>
                                })}
                                </Typography>
                                <Typography variant='h6'>
                                    Revenue: <Typography component='Typography' variant='subtitle1'>{data.revenue}</Typography>
                                </Typography>
                                <Typography variant='h6'>
                                    Runtime: <Typography component='span' variant='subtitle1'>{data.runtime}</Typography>
                                </Typography>
                                <Typography variant='h6'>
                                    Tagline: <Typography component='span' variant='subtitle1'>{data.tagline}</Typography>
                                </Typography>
                                <Typography variant='h6'>
                                    Release: <Typography component='span' variant='subtitle1'>{data.release_date}</Typography>
                                </Typography>
                                <Typography variant='h6'>
                                    Popularity: <Typography component='span' variant='subtitle1'>{data.popularity}</Typography>
                                </Typography>
                                <Typography variant='h6'>
                                    Production-countries: {data.production_countries?.map((e) => {
                                        return <Typography component='span' variant='subtitle1' style={{ paddingLeft: '15px' }}>{e.name}</Typography>
                                    })}
                                </Typography>
                                <Typography variant='h6'>
                                    Production-companies: {data.production_companies?.map((e) => {
                                        return (
                                            <Typography component='span' variant='subtitle1' style={{ paddingLeft: '15px' }}>{e.name}</Typography>
                                        )
                                    })}
                                </Typography>
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
                                <Link to={`/person/${e.id}`} style={{ color: 'black', textDecoration: 'none' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="700"
                                            image={e.profile_path ? `https://www.themoviedb.org/t/p/original${e.profile_path}` : 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {e.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <ul>
                                                    <Typography>
                                                        {e.character.slice(0, 30)}...
                                                    </Typography>
                                                    <Typography>
                                                        {e.known_for_department}
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
                <Box sx={style}>
                    <Card sx={{ maxWidth: "100%", height: '100%' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                image={modalImg}
                                sx={{ width: "100%", height: '100%' }}
                                alt="green iguana"
                            />
                        </CardActionArea>
                    </Card>
                </Box>
            </Modal>
        </Box >
    );
}

export default LearnMore