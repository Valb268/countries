import React from 'react';
import Placeholder from "./Placeholder";

const Loading = ({errorMsg}) => {

    return (
        <>
            {errorMsg ? <div className="alert alert-warning w-50 text-center mx-3" role="alert">
                {errorMsg}
            </div> : <Placeholder/>}
        </>
    );
};

export default Loading;