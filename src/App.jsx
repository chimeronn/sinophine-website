import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./Home"
import Loading from "./Loading"
import ToluenePlayer from "./ToluenePlayer";
import CassetePlayer from "./CassetePlayer";
import SaveALittleTimePlayer from "./SaveALittleTimePlayer"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/Toluene" element={<ToluenePlayer/>}></Route>
        <Route path="/Cassete" element={<CassetePlayer></CassetePlayer>}></Route>
        <Route path="/Save A Little Time" element={<SaveALittleTimePlayer></SaveALittleTimePlayer>}></Route>
      </Routes>
    </Router>
  );
}

export default App
