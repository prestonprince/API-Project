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

                    </div>
                </div>
                <div>
                    {spot.ownerId === user.id && (
                        <div>
                            <button className="clickable" onClick={handleDelete}>Delete Spot</button>
                            <button className="clickable" onClick={handleEdit}>Edit</button>
                        </div>
                    )}
                </div>
            </div>
        )
    } else return (
        <div className="loader"></div>
    );
};

export default SpotDetails;
