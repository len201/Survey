import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";

// create an action creator
export const fetchUser = () => async (dispatch) => {
    // make a get request to Express backend
    // pass in the route to API (relative path)
    const res = await axios.get('/api/current_user');
        //only when getting response from API, dispatch the action
        dispatch({ type: FETCH_USER, payload: res.data });
};

//post token to the backend server
export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: res.data });
}

export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);
    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');

    dispatch({ type: FETCH_SURVEYS, payload: res.data });
}