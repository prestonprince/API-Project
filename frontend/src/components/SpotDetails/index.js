import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { csrfFetch } from "../../store/csrf";

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
        <div>
            {isLoaded && Object.keys(spot).length > 0 ? (
                <div className="detail-container">
                    <div className="images-box">
                        {spot.SpotImages.map(obj => (<img alt={obj.id} key={obj.id} src={obj.url}></img>))}
                    </div>
                    <div className="title-box">
                        <h2>Entire spot hosted by {spot.Owner.firstName}</h2>
                    </div>
                    <div className="description-box">
                        <p>{spot.description}.</p>
                    </div>
                </div>
            ) : (<div className="loader"></div>)}
        </div>

    )
};

export default SpotDetails;
