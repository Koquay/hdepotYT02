import { createReducer } from "@ngrx/store";

const initialState = {
    heroCarouselImages: [
        "Screenshot%20from%202024-07-02%2010-32-18.png",
        "Screenshot%20from%202024-07-02%2010-35-42.png",
        "Screenshot%20from%202024-07-02%2010-35-31.png"
    ],
    
}

export const HomeReducer = createReducer(initialState);