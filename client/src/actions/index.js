import axios from "axios";
import { FETCH_USER } from "./types";

// create an action creator
export const fetchUser = () => async (dispatch) => {
    // make a get request to Express backend
    // pass in the route to API (relative path)
    const res = await axios.get('/api/current_user');
        //only when getting response from API, dispatch the action
        dispatch({ type: FETCH_USER, payload: res });
};