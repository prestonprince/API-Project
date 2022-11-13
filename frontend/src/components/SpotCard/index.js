import "./SpotCard.css"

const SpotCard = ({ spot }) => {
    return (
        <div className="card">
            <div className="image-container">
                <img alt={spot.name} src={spot.previewImage}></img>
            </div>
            <div className='card-content'>
                <div className='card-title'>
                    <h4>{spot.name}</h4>
                </div>
                <br></br>
                <div className='footer'>
                    <div className='price-container'>
                        <p><span className='price'>${spot.price}</span> night</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SpotCard;
