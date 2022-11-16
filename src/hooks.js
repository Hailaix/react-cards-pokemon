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

export { useFlip };