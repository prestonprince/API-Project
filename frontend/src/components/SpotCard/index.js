import "./SpotCard.css"

const SpotCard = ({ spot }) => {
    return (
        <div className="card">
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
