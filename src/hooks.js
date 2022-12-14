import axios from "axios";
import { v4 as uuid } from "uuid";
import React, { useEffect, useState } from "react";

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
 * Hook that places a piece of state in local storage under key key. on update of the state,
 * local storage is also updated to reflect the change.
 */
const useLocalStorage = (key, initialValue) => {
    const [state, setState] = useState(() => {
        try {
            let value = JSON.parse(window.localStorage.getItem(key) || initialValue);
            return value;
        } catch (e) {
            console.error(e);
        }
    });
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state))
    }, [key, state])
    return [state, setState];
}

/**
 * Hook that performs an AJAX call to given url, adds response data to an array
 * returns the array of data and the request function. request function can take an additional
 * endpoint for the baseUrl to request a different resource from the same API
 * format is a function passed in to extract only the data we want from the response from the API
 */
const useAxios = (baseUrl, key, format) => {
    const [data, setData] = useLocalStorage(key, '[]');

    const requestData = async (endpoint = '') => {
        try {
            const res = await axios.get(`${baseUrl}/${endpoint}`);
            const formattedRes = format(res.data);
            setData(data => [...data, { ...formattedRes, id: uuid() }]);
        } catch (e) {
            console.error(e);
        }
    }
    const resetData = () => {
        setData([]);
    }
    return [data, requestData, resetData];
}
export { useFlip, useAxios };