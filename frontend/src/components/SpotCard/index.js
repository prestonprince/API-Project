import { useHistory } from "react-router-dom";

import "./SpotCard.css"

const SpotCard = ({ spot }) => {
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        history.push(`/spots/${spot.id}`)
    }

    return (
        <div onClick={handleClick} className="card">
            <div className='image-container'>
                <img alt={spot.name} src={spot.previewImage}></img>
            </div>
            <div className='title-container'>
                <h5>{spot.city}, {spot.state}</h5>
            </div>
            <div className='price-container'>
                <p><span className='price'>${spot.price}</span> night</p>
            </div>
        </div>
    )
};

export default SpotCard;
