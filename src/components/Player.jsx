import React, {useRef, useState, useEffect} from "react"
import "./css/Player.css"

const Player = ({audioRef, isPlaying, updateCurrTime, songName}) => {
    const [progress, setProgress] = useState(0);

    const RADIUS = 200;
    const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

    const handleTimeUpdate = () => {
        updateCurrTime();
        const current = audioRef.current.currentTime;
        const total = audioRef.current.duration;
        setProgress((current / total) * 100)
    }

    const strokeDashoffset = CIRCUMFERENCE - (CIRCUMFERENCE * progress) / 100

    return (
        <div className="player-container">
            <svg className="progress-ring" width="440" height="440">
                <circle className="progress-background" r="200" cx="220" cy="220"></circle>
                <circle className="progress-bar" r="200" cx="220" 
                cy="220" strokeDasharray={CIRCUMFERENCE} style={{strokeDashoffset}}></circle>
            </svg>
            <div className="art-wrapper">
                <img className="album-art" src={"/" + songName + ".jpg"} alt="Toluene"></img>
                {/* <button className="play-button" onClick={togglePlay}>
                    {isPlaying ? "❚❚" : "▶"}
                </button> */}
            </div>
            <audio id="song" ref={audioRef} src={"/music/" + songName + ".mp3"} onTimeUpdate={handleTimeUpdate}></audio>
        </div>
    );
}

export default Player;