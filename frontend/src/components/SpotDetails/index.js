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
    }, [spotId])

    return (
        <div className="page-container"> 
            {isLoaded && Object.keys(spot).length > 0 ? (
                <>
                    <div>
                        <div className="image-box">
                                {spot.SpotImages.map(obj => (<img alt={obj.id} src={obj.url} key={obj.id} ></img>))}
                        </div>
                    </div>
                    <div className="details-container">
                        <div className="title-box">

                        </div>
                        <div className="bookings-card">

                        </div>
                        <div className="description-box">

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
