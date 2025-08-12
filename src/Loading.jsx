import React, {useEffect} from "react";

function Loading() {
    useEffect(() => {
        window.location.href = "http://127.0.0.1:8080/";
    }, []);
        
    return(
        <div>Waiting for Spotify...</div>
    )
}

export default Loading