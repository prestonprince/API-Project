
import { useSelector } from 'react-redux';
import SpotCard from '../SpotCard';

import "./SpotsView.css"

const SpotsView = () => {
    const spotsObj = useSelector(state => state.spots.allSpots);

    return (
        <div className='card-container'>
            {Object.values(spotsObj).map((spot) => (
                    <SpotCard key={`spot${spot.id}`} spot={spot} />
                ))}
        </div>
    )
};

export default SpotsView;
