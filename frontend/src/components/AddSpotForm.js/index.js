import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { postSpot } from "../../store/spot";

const AddSpotForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [hasSubbmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [previewImageUrl, setPreviewImageUrl] = useState('')
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setHasSubmitted(true)

        const spotInfo ={
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            previewImageUrl,
            price
        };
        
        return dispatch(postSpot(spotInfo)).then((data) => {
            setAddress('');
            setCity('');
            setState('');
            setCountry('');
            setLat('');
            setLng('');
            setName('');
            setDescription('');
            setPreviewImageUrl('');
            setPrice('');
            history.push(`/spots/${data.id}`)
        })
        .catch((e) => console.log(e))

        // history.push('/')
    }   

    return (
        <div>
            <h2>Host Your Very Own Spot!</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="address">
                    <input
                        type='text'
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        placeholder=' Address'
                        required
                    />
                </label>
                <label htmlFor="city">
                    <input
                        type='text'
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        placeholder=' City'
                        required
                    />
                </label>
                <label htmlFor="state">
                    <input
                        type='text'
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                        placeholder=' State'
                        required
                    />
                </label>
                <label htmlFor="country">
                    <input
                        type='text'
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        placeholder=' Country'
                        required
                    />
                </label>
                <label htmlFor="latitude">
                    <input
                        type='text'
                        onChange={(e) => setLat(e.target.value)}
                        value={lat}
                        placeholder=' Latitude'
                        required
                    />
                </label>
                <label htmlFor="longitude">
                    <input
                        type='text'
                        onChange={(e) => setLng(e.target.value)}
                        value={lng}
                        placeholder=' Longitude'
                        required
                    />
                </label>
                <label htmlFor="name">
                    <input
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder=' Name'
                        required
                    />
                </label>
                <label htmlFor="description">
                    <input
                        type='text'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder=' Description'
                        required
                    />
                </label>
                <label htmlFor="preview image url">
                    <input
                        type='text'
                        onChange={(e) => setPreviewImageUrl(e.target.value)}
                        value={previewImageUrl}
                        placeholder=' Preview Image Url'
                        required
                    />
                </label>
                <label htmlFor="price">
                    <input
                        type='number'
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder=' Price'
                        required
                    />
                </label>
                <button>Host</button>
            </form>
        </div>
    )
};

export default AddSpotForm;
