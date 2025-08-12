import Player from "./components/Player"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import "./MusicPlayer.css"
import React, {useState, useRef, useEffect} from "react";

function CassetePlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [lyrics, setLyrics] = useState(false);
    const [activeLine, setActiveLine] = useState(0);

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

   useEffect(() => {
    if(audioRef.current?.currentTime >= 232.5) setActiveLine(39);
    else if(audioRef.current?.currentTime >= 230) setActiveLine(38);
    else if(audioRef.current?.currentTime >= 225) setActiveLine(37);
    else if(audioRef.current?.currentTime >= 219.5) setActiveLine(36);
    else if(audioRef.current?.currentTime >= 215) setActiveLine(35);
    else if(audioRef.current?.currentTime >= 212.5) setActiveLine(34);
    else if(audioRef.current?.currentTime >= 210) setActiveLine(33);
    else if(audioRef.current?.currentTime >= 205) setActiveLine(32);
    else if(audioRef.current?.currentTime >= 199.5) setActiveLine(31);
    else if(audioRef.current?.currentTime >= 195) setActiveLine(30);
    else if(audioRef.current?.currentTime >= 192) setActiveLine(29);
    else if(audioRef.current?.currentTime >= 147) setActiveLine(28);
    else if(audioRef.current?.currentTime >= 144.5) setActiveLine(27);
    else if(audioRef.current?.currentTime >= 139.5) setActiveLine(26);
    else if(audioRef.current?.currentTime >= 134) setActiveLine(25);
    else if(audioRef.current?.currentTime >= 129.5) setActiveLine(24);
    else if(audioRef.current?.currentTime >= 126.5) setActiveLine(23);
    else if(audioRef.current?.currentTime >= 123.5) setActiveLine(22);
    else if(audioRef.current?.currentTime >= 121) setActiveLine(21);
    else if(audioRef.current?.currentTime >= 116) setActiveLine(20);
    else if(audioRef.current?.currentTime >= 109.5) setActiveLine(19);
    else if(audioRef.current?.currentTime >= 106.5) setActiveLine(18);
    else if(audioRef.current?.currentTime >= 104.5) setActiveLine(17);
    else if(audioRef.current?.currentTime >= 99.5) setActiveLine(16);
    else if(audioRef.current?.currentTime >= 94) setActiveLine(15);
    else if(audioRef.current?.currentTime >= 86.5) setActiveLine(14);
    else if(audioRef.current?.currentTime >= 84) setActiveLine(13);
    else if(audioRef.current?.currentTime >= 79.5) setActiveLine(12);
    else if(audioRef.current?.currentTime >= 74) setActiveLine(11);
    else if(audioRef.current?.currentTime >= 69) setActiveLine(10);
    else if(audioRef.current?.currentTime >= 66) setActiveLine(9);
    else if(audioRef.current?.currentTime >= 63) setActiveLine(8);
    else if(audioRef.current?.currentTime >= 60.5) setActiveLine(7);
    else if(audioRef.current?.currentTime >= 55.5) setActiveLine(6);
    else if(audioRef.current?.currentTime >= 49) setActiveLine(5);
    else if(audioRef.current?.currentTime >= 46.5) setActiveLine(4);
    else if(audioRef.current?.currentTime >= 44) setActiveLine(3);
    else if(audioRef.current?.currentTime >= 39) setActiveLine(2);
    else if(audioRef.current?.currentTime >= 33.5) setActiveLine(1);
    else setActiveLine(0);
   }, [currentTime]);
   
    return (
        <div className="main-container" style={{backgroundColor:"#b2436c"}}>
            <div className="navbar-container">
                <Navbar></Navbar>
            </div>
            <div className="body-container">
                <div className="song-container">
                    <div className="player-container">
                        <Player audioRef={audioRef} isPlaying={isPlaying} updateCurrTime={handleTimeUpdate} songName="cassete"></Player>
                    </div>
                    <div className="title-container">
                        <h1 id="title" style={{color: "#F4FFFC"}}>Cassete</h1>
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
                    <p id="line1" style={{color: activeLine >= 1 ? "red" : "#E8E7F5"}}>Oh what a pretty picture we could make</p>
                    <p id="line2" style={{color: activeLine >= 2 ? "red" : "#E8E7F5"}}>and in our minds we're chasing figure eight</p>
                    <p id="line3" style={{color: activeLine >= 3 ? "red" : "#E8E7F5"}}>darling I ask do you love me love me,</p>
                    <p id="line4" style={{color: activeLine >= 4 ? "red" : "#E8E7F5"}}>or do you just love to say,</p>
                    <p id="line5" style={{color: activeLine >= 5 ? "red" : "#E8E7F5"}}>words that make me start to commiserate</p>
                    <br></br>
                    <p id="line6" style={{color: activeLine >= 6 ? "red" : "#E8E7F5"}}>and you take your time till my eyes are stuck in mid saccade</p>
                    <p id="line7" style={{color: activeLine >= 7 ? "red" : "#E8E7F5"}}>you might try to make some headway</p>
                    <p id="line8" style={{color: activeLine >= 8 ? "red" : "#E8E7F5"}}>but deep down I know its pointless</p>
                    <br></br>
                    <p id="line9" style={{color: activeLine >= 9 ? "red" : "#E8E7F5"}}>because the truth is</p>
                    <p id="line10" style={{color: activeLine >= 10 ? "red" : "#E8E7F5"}}>I miss you</p>
                    <p id="line11" style={{color: activeLine >= 11 ? "red" : "#E8E7F5"}}>and I hope you miss me too</p>
                    <p id="line12" style={{color: activeLine >= 12 ? "red" : "#E8E7F5"}}>come here soon</p>
                    <p id="line13" style={{color: activeLine >= 13 ? "red" : "#E8E7F5"}}>and let me see your eyes</p>
                    <p id="line14" style={{color: activeLine >= 14 ? "red" : "#E8E7F5"}}>reflecting the moon</p>
                    <br></br>
                    <p id="line15" style={{color: activeLine >= 15 ? "red" : "#E8E7F5"}}>Oh what a pretty picture we could make</p>
                    <p id="line16" style={{color: activeLine >= 16 ? "red" : "#E8E7F5"}}>and in our minds we're chasing figure eight</p>
                    <p id="line17" style={{color: activeLine >= 17 ? "red" : "#E8E7F5"}}>darling I ask do you love me love me,</p>
                    <p id="line18" style={{color: activeLine >= 18 ? "red" : "#E8E7F5"}}>or do you just love to say,</p>
                    <p id="line19" style={{color: activeLine >= 19 ? "red" : "#E8E7F5"}}>words that make me start to commiserate</p>
                    <br></br>
                    <p id="line20" style={{color: activeLine >= 20 ? "red" : "#E8E7F5"}}>and you take your time till my eyes are stuck in mid saccade</p>
                    <p id="line21" style={{color: activeLine >= 21 ? "red" : "#E8E7F5"}}>you might try to make some headway</p>
                    <p id="line22" style={{color: activeLine >= 22 ? "red" : "#E8E7F5"}}>but deep down I know its pointless</p>
                    <br></br>
                    <p id="line23" style={{color: activeLine >= 23 ? "red" : "#E8E7F5"}}>because the truth is</p>
                    <p id="line24" style={{color: activeLine >= 24 ? "red" : "#E8E7F5"}}>I miss you</p>
                    <p id="line25" style={{color: activeLine >= 25 ? "red" : "#E8E7F5"}}>and I hope you miss me too</p>
                    <p id="line26" style={{color: activeLine >= 26 ? "red" : "#E8E7F5"}}>come here soon</p>
                    <p id="line27" style={{color: activeLine >= 27 ? "red" : "#E8E7F5"}}>and let me see your eyes</p>
                    <p id="line28" style={{color: activeLine >= 28 ? "red" : "#E8E7F5"}}>reflecting the moon</p>
                    <br></br>
                    <p id="line29" style={{color: activeLine >= 29 ? "red" : "#E8E7F5"}}>because the truth is</p>
                    <p id="line30" style={{color: activeLine >= 30 ? "red" : "#E8E7F5"}}>I miss you</p>
                    <p id="line31" style={{color: activeLine >= 31 ? "red" : "#E8E7F5"}}>and I hope you miss me too</p>
                    <p id="line32" style={{color: activeLine >= 32 ? "red" : "#E8E7F5"}}>come here soon</p>
                    <p id="line33" style={{color: activeLine >= 33 ? "red" : "#E8E7F5"}}>and let me see your eyes</p>
                    <p id="line34" style={{color: activeLine >= 34 ? "red" : "#E8E7F5"}}>reflecting the moon</p>
                    <br/>
                    <p id="line35" style={{color: activeLine >= 35 ? "red" : "#E8E7F5"}}>I miss you</p>
                    <p id="line36" style={{color: activeLine >= 36 ? "red" : "#E8E7F5"}}>and I hope you miss me too</p>
                    <p id="line37" style={{color: activeLine >= 37 ? "red" : "#E8E7F5"}}>come here soon</p>
                    <p id="line38" style={{color: activeLine >= 38 ? "red" : "#E8E7F5"}}>and let me see your eyes</p>
                    <p id="line39" style={{color: activeLine >= 39 ? "red" : "#E8E7F5"}}>reflecting the moon</p>
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

export default CassetePlayer