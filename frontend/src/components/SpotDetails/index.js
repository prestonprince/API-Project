import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { csrfFetch } from "../../store/csrf";
import { removeSpot } from "../../store/spot";
import "./SpotDetails.css"

const SpotDetails = () => {
    const { spotId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [spot, setSpot] = useState({});
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() => {
        const myFetch = async() => {
            const res = await csrfFetch(`/api/spots/${spotId}`);
            if (res.ok) {
                const data = await res.json()
                setIsLoaded(true)
                setSpot(data)
            } else {
                throw res
            };
        };

        myFetch();
    }, [spotId]);

    const capitalize = (str) => {
        const capital = str[0].toUpperCase();
        const newStr = capital + str.slice(1);
        return newStr
    };

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(removeSpot(spot))
        history.push('/')
    };

    const handleEdit = (e) => {
        e.preventDefault();
        history.push(`/spots/${spot.id}/edit`)
    };

    if (isLoaded && Object.keys(spot).length > 0) {
        return (
            <div className="page-container">
                <div className="header-container">
                    <div className="header-upper">
                        <h2>{spot.name}</h2>
                    </div>
                    <div className="header-lower">
                        <div className="header-lower-left">
                            {spot.avgStarRating ? (
                                <p>★ {spot.avgStarRating}</p>
                                )
                            :
                                (
                                    <p>★ No Reviews Yet</p>
                                )
                            }
                            <p>{spot.numReviews} {spot.numReviews === 1 ? (<>review</>) : (<>reviews</>)}</p>
                            <p className="city-state">{spot.city}, {spot.state}</p>
                        </div>
                        <div className="header-lower-right">
                            {spot.ownerId === user.id && (
                                <div className="buttons">
                                    <button className="clickable delete-btn" onClick={handleDelete}><i className="fa-regular fa-trash-can"></i></button>
                                    <button className="clickable edit-btn" onClick={handleEdit}><i className="fa-regular fa-pen-to-square"></i></button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="image-box">
                    <div className="image-box-left">
                        <img className="big-img" alt={spot.SpotImages[0].id} src={spot.SpotImages[0].url}></img>
                    </div>
                    <div className="image-box-right">
                        <div className="imgbox-top">
                            <div className="top-left smimg-top">
                                {spot.SpotImages[1]
                                        ? (
                                            <img className="det-img" alt={spot.SpotImages[1].id} src={spot.SpotImages[1].url}></img>
                                        )
                                        : (
                                            <p>No Image Available</p>
                                        )
                                }
                            </div>
                            <div className="top-right smimg-top">
                                {spot.SpotImages[2]
                                        ? (
                                            <img className="det-img top-corner" alt={spot.SpotImages[2].id} src={spot.SpotImages[2].url}></img>
                                        )
                                        : (
                                            <p>No Image Available</p>
                                        )
                                }
                            </div>
                        </div>
                        <div className="imgbox-bot">
                            <div className="bot-left smimg-bot">
                                {spot.SpotImages[3]
                                    ? (
                                        <img className="det-img" alt={spot.SpotImages[3].id} src={spot.SpotImages[3].url}></img>
                                    )
                                    : (
                                        <p>No Image Available</p>
                                    )
                                }
                            </div>
                            <div className="bot-right smimg-bot">
                                {spot.SpotImages[4]
                                ? (
                                    <img className="det-img bot-corner" alt={spot.SpotImages[4].id} src={spot.SpotImages[4].url}></img>
                                )
                                : (
                                    <p>No Image Available</p>
                                )
                                }
                            </div>
                        </div>
                    </div>   
                </div>
                <div className="body-container">
                    <div className="body-left">
                        <div className="body-left-header">
                            <h3>Entire spot hosted by {capitalize(spot.Owner.firstName)} {capitalize(spot.Owner.lastName)}</h3>
                            <p>6 guests · 4 bedrooms · 5 beds · 2 baths</p>
                            <hr className="line"></hr>
                        </div>
                        <div className="body-left-standout">
                            <div className="super-host">
                                <h3>{capitalize(spot.Owner.firstName)} is a Superhost</h3>
                                <p>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests</p>
                            </div>
                            <div className="check-in">
                               <h3>Self check-in</h3>
                               <p>You can check in with the smart lock</p> 
                            </div>
                            <div className="cancellation">
                                <h3>Free cancellation for 48 hours.</h3>
                                <hr className="line"></hr>
                            </div>
                        </div>
                        <div className="body-left-desc">
                            <p>{spot.description}</p>
                        </div>
                    </div>
                    <div className="body-right">
                        <div className="booking-card">

                        </div>
                    </div>
                </div>
            </div>
        )
    } else return (
        <div className="loader"></div>
    );
};

export default SpotDetails;
