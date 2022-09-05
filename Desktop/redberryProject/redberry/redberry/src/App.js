import React from "react";
import "./App.css";
import StartPage from "./components/StartPage";
import StuffInfo from "./components/StuffInfo";
import LaptopInfo from "./components/LaptopInfo";
import FinishPage from "./components/FinishPage";
import List from "./components/List";
import ItemDetails from "./components/ItemDetails";
import { TextField, Select, MenuItem } from "@mui/material";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
function App() {
  const [teams, setTeams] = React.useState([]);
  React.useEffect(() => {
    fetch("https://pcfy.redberryinternship.ge/api/teams")
      .then((response) => response.json())
      .then((data) => {
        setTeams(data.data);
      });
  }, []);
  const teamsOptions = teams.map((option) => {
    return (
      <MenuItem key={option.id} value={option.id}>
        {option.name}
      </MenuItem>
    );
  });
  ///////////////////////////////////////////////////////////////////////////////////////
  const [positions, setPositions] = React.useState([]);
  React.useEffect(() => {
    fetch("https://pcfy.redberryinternship.ge/api/positions")
      .then((response) => response.json())
      .then((data) => {
        setPositions(data.data);
      });
  }, []);

  ///////////////////////////////////////////////////////////////////////////////
  const [brands, setBrands] = React.useState([]);
  React.useEffect(() => {
    fetch("https://pcfy.redberryinternship.ge/api/brands")
      .then((response) => response.json())
      .then((data) => {
        setBrands(data.data);
      });
  }, []);
  const brandsOptions = brands.map((option) => {
    return (
      <MenuItem key={option.id} value={option.id}>
        {option.name}
      </MenuItem>
    );
  });
  /////////////////////////////////////////////////////////////////////////////
  const [cpus, setCpus] = React.useState([]);
  React.useEffect(() => {
    fetch("https://pcfy.redberryinternship.ge/api/cpus")
      .then((response) => response.json())
      .then((data) => {
        setCpus(data.data);
      });
  }, []);
  const cpusOptions = cpus.map((option) => {
    return (
      <MenuItem key={option.id} value={option.name}>
        {option.name}
      </MenuItem>
    );
  });
  ////////////////////////////////////////////////////////////////////////
  const [data, setData] = React.useState({});
  //
  /*   

*/
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route
            path="/stuff"
            element={
              <StuffInfo
                teamsOptions={teamsOptions}
                positionsData={positions}
                setData={setData}
              />
            }
          />
          <Route
            path="/laptop"
            element={
              <LaptopInfo
                brandsOptions={brandsOptions}
                cpusOptions={cpusOptions}
                data={data}
              />
            }
          />
          <Route path="/finish" element={<FinishPage />} />
          <Route path="/list/" exact element={<List />} />
          <Route path="/list/:id" exact element={<ItemDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
