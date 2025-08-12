import Player from "./components/Player"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import "./MusicPlayer.css"
import React, {useState, useRef, useEffect} from "react";

function SaveALittleTimePlayer() {
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
       if(audioRef.current?.currentTime >= 237.5) setActiveLine(46);
       else if(audioRef.current?.currentTime >= 234.5) setActiveLine(45);
       else if(audioRef.current?.currentTime >= 230.5) setActiveLine(44);
       else if(audioRef.current?.currentTime >= 227.5) setActiveLine(43);
       else if(audioRef.current?.currentTime >= 224.5) setActiveLine(42);
       else if(audioRef.current?.currentTime >= 220.5) setActiveLine(41);
       else if(audioRef.current?.currentTime >= 193.5) setActiveLine(40);
       else if(audioRef.current?.currentTime >= 190.5) setActiveLine(39);
       else if(audioRef.current?.currentTime >= 187.5) setActiveLine(38);
       else if(audioRef.current?.currentTime >= 185.5) setActiveLine(37);
       else if(audioRef.current?.currentTime >= 183.5) setActiveLine(36);
       else if(audioRef.current?.currentTime >= 180.5) setActiveLine(35);
       else if(audioRef.current?.currentTime >= 177.5) setActiveLine(34);
       else if(audioRef.current?.currentTime >= 175.5) setActiveLine(33);
       else if(audioRef.current?.currentTime >= 173.5) setActiveLine(32);
       else if(audioRef.current?.currentTime >= 171) setActiveLine(31);
       else if(audioRef.current?.currentTime >= 168) setActiveLine(30);
       else if(audioRef.current?.currentTime >= 165.5) setActiveLine(29);
       else if(audioRef.current?.currentTime >= 163) setActiveLine(28);
       else if(audioRef.current?.currentTime >= 161) setActiveLine(27);
       else if(audioRef.current?.currentTime >= 158) setActiveLine(26);
       else if(audioRef.current?.currentTime >= 156) setActiveLine(25);
       else if(audioRef.current?.currentTime >= 134) setActiveLine(24);
       else if(audioRef.current?.currentTime >= 131.5) setActiveLine(23);
       else if(audioRef.current?.currentTime >= 129) setActiveLine(22);
       else if(audioRef.current?.currentTime >= 127) setActiveLine(21);
       else if(audioRef.current?.currentTime >= 114.5) setActiveLine(20);
       else if(audioRef.current?.currentTime >= 112) setActiveLine(19);
       else if(audioRef.current?.currentTime >= 107.5) setActiveLine(18);
       else if(audioRef.current?.currentTime >= 102.5) setActiveLine(17);
       else if(audioRef.current?.currentTime >= 97) setActiveLine(16);
       else if(audioRef.current?.currentTime >= 95.5) setActiveLine(15);
       else if(audioRef.current?.currentTime >= 92.5) setActiveLine(14);
       else if(audioRef.current?.currentTime >= 89.5) setActiveLine(13);
       else if(audioRef.current?.currentTime >= 87.5) setActiveLine(12);
       else if(audioRef.current?.currentTime >= 84.5) setActiveLine(11);
       else if(audioRef.current?.currentTime >= 82.5) setActiveLine(10);
       else if(audioRef.current?.currentTime >= 80) setActiveLine(9);
       else if(audioRef.current?.currentTime >= 77.5) setActiveLine(8);
       else if(audioRef.current?.currentTime >= 75.5) setActiveLine(7);
       else if(audioRef.current?.currentTime >= 73) setActiveLine(6);
       else if(audioRef.current?.currentTime >= 68.5) setActiveLine(5);
       else if(audioRef.current?.currentTime >= 66) setActiveLine(4);
       else if(audioRef.current?.currentTime >= 58.5) setActiveLine(3);
       else if(audioRef.current?.currentTime >= 53.5) setActiveLine(2);
       else if(audioRef.current?.currentTime >= 48) setActiveLine(1);
       else setActiveLine(0);
      }, [currentTime]);
        
    return (
        <div className="main-container" style={{backgroundColor:"#decea8"}}>
            <div className="navbar-container">
                <Navbar></Navbar>
            </div>
            <div className="body-container">
                <div className="song-container">
                    <div className="player-container">
                        <Player audioRef={audioRef} isPlaying={isPlaying} updateCurrTime={handleTimeUpdate} songName="save-a-little-time"></Player>
                    </div>
                    <div className="title-container">
                        <h1 id="title" style={{color: "#966334"}}>Save a Little Time</h1>
                    </div>
                    <h6 id="artist" style={{color:"#010A1D"}}>sinophine</h6>
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
                    <p id="line1" style={{color: activeLine >= 1 ? "red" : "#E8E7F5"}}>You'll have to cash another check</p>
                    <p id="line2" style={{color: activeLine >= 2 ? "red" : "#E8E7F5"}}>Before we fix what's in your head</p>
                    <p id="line3" style={{color: activeLine >= 3 ? "red" : "#E8E7F5"}}>Something in the building</p>
                    <p id="line4" style={{color: activeLine >= 4 ? "red" : "#E8E7F5"}}>Is burning out</p>
                    <p id="line5" style={{color: activeLine >= 5 ? "red" : "#E8E7F5"}}>We always said that we loved the idea</p>
                    <p id="line6" style={{color: activeLine >= 6 ? "red" : "#E8E7F5"}}>More than loved them as people</p>
                    <p id="line7" style={{color: activeLine >= 7 ? "red" : "#E8E7F5"}}>But this time I think it's real</p>
                    <p id="line8" style={{color: activeLine >= 8 ? "red" : "#E8E7F5"}}>Cause when you see him</p>
                    <p id="line9" style={{color: activeLine >= 9 ? "red" : "#E8E7F5"}}>You're not breathing</p>
                    <p id="line10" style={{color: activeLine >= 10 ? "red" : "#E8E7F5"}}>Soon enough</p>
                    <p id="line11" style={{color: activeLine >= 11 ? "red" : "#E8E7F5"}}>We'll be there</p>
                    <p id="line12" style={{color: activeLine >= 12 ? "red" : "#E8E7F5"}}>If you feel this</p>
                    <p id="line13" style={{color: activeLine >= 13 ? "red" : "#E8E7F5"}}>Then you should say it</p>
                    <p id="line14" style={{color: activeLine >= 14 ? "red" : "#E8E7F5"}}>To me</p>
                    <p id="line15" style={{color: activeLine >= 15 ? "red" : "#E8E7F5"}}>Save a little time</p>
                    <br></br>
                    <p id="line16" style={{color: activeLine >= 16 ? "red" : "#E8E7F5"}}>You got me waiting for a text</p>
                    <p id="line17" style={{color: activeLine >= 17 ? "red" : "#E8E7F5"}}>When I'm meant to be in bed</p>
                    <p id="line18" style={{color: activeLine >= 18 ? "red" : "#E8E7F5"}}>Something that you're giving</p>
                    <p id="line19" style={{color: activeLine >= 19 ? "red" : "#E8E7F5"}}>It makes me go insane</p>
                    <p id="line20" style={{color: activeLine >= 20 ? "red" : "#E8E7F5"}}>Yeah it's making me insane</p>
                    <br></br>
                    <p id="line21" style={{color: activeLine >= 21 ? "red" : "#E8E7F5"}}>Baby, all we said</p>
                    <p id="line22" style={{color: activeLine >= 22 ? "red" : "#E8E7F5"}}>Is that we love the idea</p>
                    <p id="line23" style={{color: activeLine >= 23 ? "red" : "#E8E7F5"}}>More than love something deeper</p>
                    <p id="line24" style={{color: activeLine >= 24 ? "red" : "#E8E7F5"}}>But this time i think you mean it</p>
                    <br></br>
                    <p id="line25" style={{color: activeLine >= 25 ? "red" : "#E8E7F5"}}>And when you see him</p>
                    <p id="line26" style={{color: activeLine >= 26 ? "red" : "#E8E7F5"}}>Oh, you're not breathing</p>
                    <p id="line27" style={{color: activeLine >= 27 ? "red" : "#E8E7F5"}}>Soon enough</p>
                    <p id="line28" style={{color: activeLine >= 28 ? "red" : "#E8E7F5"}}>We'll be there</p>
                    <p id="line29" style={{color: activeLine >= 29 ? "red" : "#E8E7F5"}}>Cause if you feel this</p>
                    <p id="line30" style={{color: activeLine >= 30 ? "red" : "#E8E7F5"}}>Then you should say it</p>
                    <p id="line31" style={{color: activeLine >= 31 ? "red" : "#E8E7F5"}}>To me</p>
                    <p id="line32" style={{color: activeLine >= 32 ? "red" : "#E8E7F5"}}>Save a little time</p>
                    <br></br>
                    <p id="line33" style={{color: activeLine >= 33 ? "red" : "#E8E7F5"}}>Cause if you feel this</p>
                    <p id="line34" style={{color: activeLine >= 34 ? "red" : "#E8E7F5"}}>Then you should say it</p>
                    <p id="line35" style={{color: activeLine >= 35 ? "red" : "#E8E7F5"}}>To me</p>
                    <p id="line36" style={{color: activeLine >= 36 ? "red" : "#E8E7F5"}}>Save a little time</p>
                    <br></br>
                    <p id="line37" style={{color: activeLine >= 37 ? "red" : "#E8E7F5"}}>Cause if you feel this</p>
                    <p id="line38" style={{color: activeLine >= 38 ? "red" : "#E8E7F5"}}>Then you should say it</p>
                    <p id="line39" style={{color: activeLine >= 39 ? "red" : "#E8E7F5"}}>To me</p>
                    <p id="line40" style={{color: activeLine >= 40 ? "red" : "#E8E7F5"}}>Save a little time</p>
                    <br></br>
                    <p id="line41" style={{color: activeLine >= 41 ? "red" : "#E8E7F5"}}>We always said that we loved the idea</p>
                    <p id="line42" style={{color: activeLine >= 42 ? "red" : "#E8E7F5"}}>More than loved them as people</p>
                    <p id="line43" style={{color: activeLine >= 43 ? "red" : "#E8E7F5"}}>But this time i think its real</p>
                    <br></br>
                    <p id="line44" style={{color: activeLine >= 44 ? "red" : "#E8E7F5"}}>We always said that we loved the idea</p>
                    <p id="line45" style={{color: activeLine >= 45 ? "red" : "#E8E7F5"}}>More than loved them as people</p>
                    <p id="line46" style={{color: activeLine >= 46 ? "red" : "#E8E7F5"}}>But this time i think its real</p>

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

export default SaveALittleTimePlayer