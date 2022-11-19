import { useHistory, useParams, Redirect } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { editSpot } from "../../store/spot";
import './EditSpotForm.css'

const EditSpotForm = ({ spot, setShowModal, setEditSubmit }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const [errors, setErrors] = useState({});
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [country, setCountry] = useState(spot.country);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price);
    const [img, setImg] = useState('');

    const user = useSelector(state => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors({})

        if (+price <= 0) {
            setErrors((prevState) => ({...prevState, price: "Price must be greater than zero"}));
            setPrice(spot.price);
            return
        }

        const spotInfo = {id: spotId}
        if (address) spotInfo.address = address;
        if (city) spotInfo.city = city;
        if (state) spotInfo.state = state;
        if (country) spotInfo.country = country;
        if (name) spotInfo.name = name;
        if (description) spotInfo.description = description;
        if (price) spotInfo.price = price;
        if (img) spotInfo.img = img;

        return dispatch(editSpot(spotInfo)).then((data) => {
            setAddress('');
            setCity('');
            setState('');
            setCountry('');
            setName('');
            setDescription('');
            setPrice('');
            setImg('');
            setShowModal(false)
            setEditSubmit(prevState => !prevState)
            history.push(`/spots/${spotId}`)
        })
        .catch(async(res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        })
    }

    return (
        <div>
            {!user && <Redirect to='/'></Redirect>}
            <h2>Edit Your Spot</h2>
            <ul className="errors">
            {Object.values(errors).map((err, idx) => (
                    <li key={idx}>{err}</li>
                ))}
            </ul>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="address">
                    <input
                        className="input"
                        type='text'
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        placeholder={` address`}
                        required
                    />
                </label>
                <label htmlFor="city">
                    <input
                        className="input"
                        type='text'
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        placeholder={` city`}
                        required
                    />
                </label>
                <label htmlFor="state">
                    <input
                        className="input"
                        type='text'
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                        placeholder={` state`}
                        required
                    />
                </label>
                <label htmlFor="country">
                    <input
                        className="input"
                        type='text'
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        placeholder={` country`}
                        required
                    />
                </label>
                <label htmlFor="name">
                    <input
                        className="input"
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder={` name`}
                        required
                    />
                </label>
                <label htmlFor="description">
                    <textarea
                        className="input"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder={` description`}
                        required
                    >
                    </textarea>
                </label>
                <label htmlFor="price">
                    <input
                        className="input"
                        type='number'
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder={` price`}
                        required
                    />
                </label>
                <label htmlFor="img">
                    <input
                        className="input"
                        type='url'
                        onChange={(e) => setImg(e.target.value)}
                        value={img}
                        placeholder={` Add an image`}
                    />
                </label>
                <br></br>
                <button className="btn edit-submit">Continue</button>
            </form>
        </div>
    )
};

export default EditSpotForm;
