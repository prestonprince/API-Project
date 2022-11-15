import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { editSpot } from "../../store/spot";

const EditSpotForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const [errors, setErrors] = useState({});
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

        const spotInfo = {id: spotId}
        if (address) spotInfo.address = address;
        if (city) spotInfo.city = city;
        if (state) spotInfo.state = state;
        if (country) spotInfo.country = country;
        if (lat) spotInfo.lat = lat;
        if (lng) spotInfo.lng = lng;
        if (name) spotInfo.name = name;
        if (description) spotInfo.description = description;
        if (price) spotInfo.price = price;

        return dispatch(editSpot(spotInfo)).then((data) => {
            setAddress('');
            setCity('');
            setState('');
            setCountry('');
            setLat('');
            setLng('');
            setName('');
            setDescription('');
            setPrice('');
            history.push(`/spots/${spotId}`)
        })
        .catch(async(res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        })
    }

    return (
        <div>
            <h2>Edit Your Spot</h2>
            <ul>
            {Object.values(errors).map((err, idx) => (
                    <li key={idx}>{err}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <label htmlFor="address">
                    <input
                        type='text'
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        placeholder=' Address'
                    />
                </label>
                <label htmlFor="city">
                    <input
                        type='text'
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        placeholder=' City'
                    />
                </label>
                <label htmlFor="state">
                    <input
                        type='text'
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                        placeholder=' State'
                    />
                </label>
                <label htmlFor="country">
                    <input
                        type='text'
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        placeholder=' Country'
                    />
                </label>
                <label htmlFor="latitude">
                    <input
                        type='text'
                        onChange={(e) => setLat(e.target.value)}
                        value={lat}
                        placeholder=' Latitude'
                    />
                </label>
                <label htmlFor="longitude">
                    <input
                        type='text'
                        onChange={(e) => setLng(e.target.value)}
                        value={lng}
                        placeholder=' Longitude'
                    />
                </label>
                <label htmlFor="name">
                    <input
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder=' Name'
                    />
                </label>
                <label htmlFor="description">
                    <input
                        type='text'
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder=' Description'
                    />
                </label>
                <label htmlFor="price">
                    <input
                        type='number'
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder=' Price'
                    />
                </label>
                <button>Continue</button>
            </form>
        </div>
    )
};

export default EditSpotForm;
