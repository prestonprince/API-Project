import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllSpots } from '../../store/spot';
import SpotCard from '../SpotCard';

const SpotsView = () => {
    const spotsObj = useSelector(state => state.spots);
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(fetchAllSpots()).then(() => setIsLoaded(true));
    }, [dispatch])

    return (
        <div>
            {isLoaded ? 
                Object.values(spotsObj).map((spot) => (
                    <SpotCard key={spot.id} spot={spot} />
                )) :
                (<p>loading...</p>)
            }
        </div>
    )
};

export default SpotsView;
