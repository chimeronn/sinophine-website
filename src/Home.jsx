import Navbar from "./components/Navbar";
import Player from "./components/Player";
import Carousel from "./components/Carousel";
import "./Home.css"
import React, {useState} from "react";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
    <div className="App">
      <Navbar setSearchQuery={setSearchQuery}/>
      <div id="content-container">
        <div id="new-release">
          <div id="new-release-caption">
            <h1 id="new-release-message">New Release!</h1>
            <h2 id="new-song-title">Toluene</h2>
            <hr></hr>
            <a href="/Toluene">
              <button type="button" className="btn btn-light btn-lg btn-block" style={{fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"}}>Listen Now</button>
            </a>
            <div id="icons">
              <a href="https://open.spotify.com/track/6HBz1FkXkTOvntJWfFCZYY"><i className="fa fa-spotify icon" style={{ fontSize: "36px", color: "#E8E7F5" }}></i></a>
              <a href="https://music.apple.com/us/album/toluene-single/1817680311"><i className="fa fa-apple icon" style= {{fontSize: "36px", color:"#E8E7F5"}}></i></a>
              <a href="https://www.youtube.com/watch?v=4QQTYqyajZ0"><i className="fa fa-youtube icon" style= {{fontSize: "36px", color:"#E8E7F5"}}></i></a>
            </div>
          </div>
          <img id="new-release-img" src="/toluene.jpg" alt="Toluene"></img>
        </div>
        <div id="songs-container">
          <Carousel searchQuery={searchQuery}></Carousel>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home
