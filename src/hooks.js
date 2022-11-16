import axios from "axios";
import { v4 as uuid } from "uuid";
import React, { useState } from "react";

/**
 * Simple toggle for a boolean state,
 * returns the state and a toggle function.
 */
const useFlip = (initialState = true) => {
    const [state, setState] = useState(initialState);
    const flipState = () => {
        setState(state => !state);
    }
    return [state, flipState];
}

const useAxios = (url) => {
    // const [cards, setCards] = useState([]);
    // const addCard = async () => {
    //     const response = await axios.get(
    //         "https://deckofcardsapi.com/api/deck/new/draw/"
    //     );
    //     setCards(cards => [...cards, { ...response.data, id: uuid() }]);
    // };
    const [data, setData] = useState([]);
    const requestData = async () => {
        const res = await axios.get(url);
        setData(data => [...data, {...res.data, id: uuid()}]);
    }
    return [data, requestData];
}
export { useFlip, useAxios };