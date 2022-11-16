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

/**
 * hook that performs an AJAX call to given url, adds response data to an array
 * returns the array of data and the request function. request function can take an additional
 * endpoint for the baseUrl to request a different resource from the same API
 */
const useAxios = (baseUrl) => {
    const [data, setData] = useState([]);

    const requestData = async ( endpoint = '' ) => {
        const res = await axios.get(`${baseUrl}/${endpoint}`);
        setData(data => [...data, { ...res.data, id: uuid() }]);
    }
    const resetData = () => {
        setData([]);
    }
    return [data, requestData, resetData];
}
export { useFlip, useAxios };