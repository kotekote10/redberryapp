import React from "react";
import { Link } from "react-router-dom";
import goback from "../imgs/backarrow.png";
import listitems from "../imgs/listitems.png";

export default function List() {
  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    fetch(
      "https://pcfy.redberryinternship.ge/api/laptops?token=eedbce2b7655ae68ac6493a419221b59"
    )
      .then((response) => response.json())
      .then((data) => {
        setList(data.data);
      });
  }, []);
  console.log(list);

  const listItems = list.map((option) => {
    console.log(option.laptop.id);
    return (
      <div className="list-item" key={option.laptop.id}>
        <img src={`${option.laptop.image}`} className="list-img" />
        <div className="list-description">
          <h3 className="list-names">{`${option.user.name} ${option.user.surname}`}</h3>
          <h3 className="list-names">{option.laptop.name}</h3>
          <Link to={`/list/${option.laptop.id}`} className="list-seemore">
            მეტის ნახვა
          </Link>
        </div>
      </div>
    );
  });
  return (
    <div className="list-container">
      <Link to="/">
        <img src={goback} className="goback" />
      </Link>
      <img src={listitems} className="list-header" />
      <div className="list-items-container">{listItems}</div>
    </div>
  );
}
