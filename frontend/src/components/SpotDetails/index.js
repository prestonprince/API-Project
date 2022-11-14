import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { csrfFetch } from "../../store/csrf";
import "./SpotDetails.css"

const SpotDetails = () => {
    const { spotId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [spot, setSpot] = useState({});

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

    return (
        <div className="page-container"> 
            {isLoaded && Object.keys(spot).length > 0 ? (
                <>
                    <div>
                        <div className="image-box">
                            {spot.SpotImages.length > 0 ? 
                                spot.SpotImages.map(obj => (<img alt={obj.id} src={obj.url} key={obj.id} ></img>))
                             : 
                             (<h3>No Images Available</h3>)
                            }
                        </div>
                    </div>
                    <div className="details-container">
                        <div className="title-box">
                            <h3>Entire spot hosted by {capitalize(spot.Owner.firstName)}</h3>
                        </div>
                        <div className="rating-box">
                            {spot.avgStarRating ? (
                                <span>★ {spot.avgStarRating}</span>
                                )
                                :
                                (<h3>This spot has no reviews</h3>)
                            }
                        </div>
                        <div className="bookings-card">

                        </div>
                        <div className="description-box">
                            <p>{spot.description}</p>
                        </div>
                    </div>
                    <div className="footer">

                    </div>
                </>
            ) : (<div className="loader"></div>)}
        </div>

    )
};

export default SpotDetails;
