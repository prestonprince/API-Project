import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import SpotCard from "../SpotCard";

const MySpots = () => {
    const { userId } = useParams();
    const spotsObj = useSelector(state => state.spots);
    const mySpotsObj = {};
    Object.values(spotsObj).forEach(obj => {
        if (+obj.ownerId === +userId) {
            mySpotsObj[obj.id] = obj
        }
    });

    return (
        <>
        <h2 style={{textAlign: 'center'}}>My Spots</h2>
            <div className="card-container">
                {Object.values(mySpotsObj).map((spot) => (
                        <SpotCard key={`spot${spot.id}`} spot={spot} />
                    ))}
            </div>
        </>
    )
};

export default MySpots;
