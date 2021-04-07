import { FETCH_SURVEYS } from "../actions/types";
import {act} from "@testing-library/react";

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_SURVEYS:
            return action.payload;
        default:
            return state;
    }
}