import Player from "./components/Player"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import "./MusicPlayer.css"
import React, {useState, useRef} from "react";

function ToluenePlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [lyrics, setLyrics] = useState(false);

    const togglePlay = () => {
        if(isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const show = () => {
        var div = document.getElementsByClassName("progress-container");
        div[0].style.display = "flex";
    }

    const handleClick = () => {
        togglePlay();
        show();
    }

    const forward = () => {
        const newTime = audioRef.current.currentTime + 5;
        audioRef.current.currentTime = Math.min(newTime, audioRef.current.duration);
    }

    const backward = () => {
        const newTime = audioRef.current.currentTime - 5;
        audioRef.current.currentTime = Math.max(newTime, 0);
    }

    const handleTimeUpdate = () => {
        const currTime = audioRef.current?.currentTime || 0;
        setCurrentTime(currTime);
    }

    const formatTime = (time) => {
        const mins = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const paddedSeconds = seconds.toString().padStart(2, "0");
        return `${mins}:${paddedSeconds}`;
    }

    const showLyrics = () => {
        var lyricDiv = document.getElementsByClassName("lyric-container");
        var songDiv = document.getElementsByClassName("song-container");

        if(!lyrics) {
            lyricDiv[0].style.display = "block";
            songDiv[0].style.gridColumnEnd = "2";
            setLyrics(true);
        } else {
            lyricDiv[0].style.display = "none";
            songDiv[0].style.gridColumnEnd = "-1";
            setLyrics(false);
        }
   }

    return (
        <div className="main-container">
            <div className="navbar-container">
                <Navbar></Navbar>
            </div>
            <div className="body-container">
                <div className="song-container">
                    <div className="player-container">
                        <Player audioRef={audioRef} isPlaying={isPlaying} updateCurrTime={handleTimeUpdate} songName="toluene"></Player>
                    </div>
                    <div className="title-container">
                        <h1 id="title">Toluene</h1>
                    </div>
                    <h6 id="artist">sinophine</h6>
                    <div className="buttons">
                        <i className="icon fa fa-backward" onClick={backward}></i>
                        <button className="btn btn-light rounded-circle custom-circle-btn" onClick={handleClick}>
                            {
                                audioRef.current?.currentTime === audioRef.current?.duration ? <i className="icon-small fa fa-refresh"></i>
                                :
                                isPlaying ?
                                <i className="icon-small fa fa-pause"></i>
                                :
                                <i className="icon-small fa fa-play"></i>
                            }
                        </button>
                        <i className="icon fa fa-forward" onClick={forward}></i>
                    </div>
                </div>
                <div className="lyric-container">
                    <h3>Lyrics</h3>
                    <p>
                        You said he was a thorn in your side
                    </p>
                </div>
            </div>
                <div className="progress-container">
                    <span>
                        {
                            formatTime(currentTime)
                        }
                    </span>
                    <input type="range" min="0" max={audioRef.current?.duration} value={currentTime} 
                    onChange={(e) => {
                        const newTime = parseFloat(e.target.value);
                        audioRef.current.currentTime = newTime;
                        setCurrentTime(newTime);
                    }}></input>
                    <span>
                        {
                            formatTime(audioRef.current?.duration)
                        }
                    </span>
                    <i className='fa fa-cc' onClick={showLyrics}></i>
                </div>
        </div>
    );
}

export default ToluenePlayer