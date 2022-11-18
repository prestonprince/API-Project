import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSpots } from '../../store/spot';
import SpotCard from '../SpotCard';

import "./SpotsView.css"

const SpotsView = () => {
    const dispatch = useDispatch();
    const [spotsLoaded, setSpotLoaded] = useState(false)
    const spotsObj = useSelector(state => state.spots.allSpots)

    useEffect(() => {
        dispatch(fetchAllSpots()).then(() => setSpotLoaded(true))
    }, [dispatch])

    return (
        <>
            {spotsLoaded ? (
                <div className='card-container'>
                    {Object.values(spotsObj).map((spot) => (
                            <SpotCard key={`spot${spot.id}`} spot={spot} />
                        ))}
                </div>

            ) :
            <div className='loader'></div>
            }
        </>
    )
};

export default SpotsView;
