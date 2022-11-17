import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { postSpot } from "../../store/spot";
import './AddSpotForm.css'

const AddSpotForm = ({ setShowSpotForm }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [previewImageUrl, setPreviewImageUrl] = useState('')
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const user = useSelector(state => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault();

        const spotInfo ={
            address,
            city,
            state,
            country,
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
            setName('');
            setDescription('');
            setPreviewImageUrl('');
            setPrice('');
            setShowSpotForm(false)
            history.push(`/spots/${data.id}`)
        })
        .catch(async(res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
    }   

    if (!user) setShowSpotForm(false)

    return (
        <div>
            {!user && <Redirect to='/'></Redirect>}
            <h2>Host Your Very Own Spot!</h2>
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
                        placeholder=' Address'
                        required
                    />
                </label>
                <label htmlFor="city">
                    <input
                        className="input"
                        type='text'
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        placeholder=' City'
                        required
                    />
                </label>
                <label htmlFor="state">
                    <input
                        className="input"
                        type='text'
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                        placeholder=' State'
                        required
                    />
                </label>
                <label htmlFor="country">
                    <input
                        className="input"
                        type='text'
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        placeholder=' Country'
                        required
                    />
                </label>
                <label htmlFor="name">
                    <input
                        className="input"
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder=' Name'
                        required
                    />
                </label>
                <label htmlFor="description">
                    <textarea
                        className="input"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder=' Description'
                        required
                    >
                    </textarea>
                </label>
                <label htmlFor="preview image url">
                    <input
                        className="input"
                        type='text'
                        onChange={(e) => setPreviewImageUrl(e.target.value)}
                        value={previewImageUrl}
                        placeholder=' Preview Image Url'
                        required
                    />
                </label>
                <label htmlFor="price">
                    <input
                        className="input"
                        type='number'
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder=' Price'
                        required
                    />
                </label>
                <br></br>
                <button className="btn host-btn">Host</button>
            </form>
        </div>
    )
};

export default AddSpotForm;
