import React from 'react';
import Placeholder from "./Placeholder";
import {useAppSelector} from "../app/hooks";

const Loading = () => {

    const message = useAppSelector(state => state.message);


    return (
        <>
            {message ? <div className="alert alert-warning w-50 text-center mx-3" role="alert">
                {message}
            </div> : <Placeholder/>}
        </>
    );
};

export default Loading;