import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllSpots } from '../../store/spot';
import SpotCard from '../SpotCard';

import "./SpotsView.css"

const SpotsView = () => {
    const spotsObj = useSelector(state => state.spots);
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(fetchAllSpots()).then(() => setIsLoaded(true));
    }, [dispatch])

    return (
        <div className='card-container'>
            {isLoaded ? 
                Object.values(spotsObj).map((spot) => (
                    <SpotCard key={spot.id} spot={spot} />
                )) :
                (<div className="loader"></div>)
            }
        </div>
    )
};

export default SpotsView;
