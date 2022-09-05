import React from "react";
import goback from "../imgs/backarrow.png";
import laptopinfo from "../imgs/laptopinfo.png";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default function ItemDetails() {
  let { id } = useParams();

  const [listItem, setListItem] = React.useState(null);
  React.useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    const fetchItem = await fetch(
      `https://pcfy.redberryinternship.ge/api/laptop/${id}?token=eedbce2b7655ae68ac6493a419221b59`
    );
    const item = await fetchItem.json();
    setListItem(item.data);
  };
  console.log(listItem);
  return listItem ? (
    <div className="details-container">
      <Link to="/list">
        <img src={goback} className="goback" />
      </Link>
      <img src={laptopinfo} className="details-header" />
      <div className="details">
        <div className="details-first-row">
          <img src={listItem.laptop.image} className="laptop-image" />
          <div className="stuff-details-key">
            <h3>სახელი:</h3>
            <h3>თიმი:</h3>
            <h3>პოზიცია:</h3>
            <h3>მეილი:</h3>
            <h3>ტელ. ნომერი:</h3>
          </div>
          <div className="stuff-details">
            <h3>{`${listItem.user.name} ${listItem.user.surname}`}</h3>
            <h3>sdsd</h3>
            <h3>მენეჯერი</h3>
            <h3>{listItem.user.email}</h3>
            <h3>{listItem.user.phone_number}</h3>
          </div>
        </div>
        <div className="details-divider1"></div>
        <div className="details-second-row">
          <div className="second-row-elements">
            <div className="stuff-details-key">
              <h3>ლეპტოპის სახელი:</h3>
              <h3>ლეპტოპ ბრენდი:</h3>
              <h3>RAM:</h3>
              <h3>მეხსიერების ტიპი:</h3>
            </div>
            <div className="stuff-details">
              <h3>{listItem.laptop.name}</h3>
              <h3>{listItem.laptop.brand_id}</h3>
              <h3>{listItem.laptop.ram}</h3>
              <h3>{listItem.laptop.hard_drive_type}</h3>
            </div>
          </div>
          <div className="second-row-elements">
            <div className="stuff-details-key">
              <h3>CPU:</h3>
              <h3>CPU-ს ბირთვი:</h3>
              <h3>CPU-ს ნაკადი:</h3>
            </div>
            <div className="stuff-details">
              <h3>{listItem.laptop.cpu.name}</h3>
              <h3>{listItem.laptop.cpu.cores}</h3>
              <h3>{listItem.laptop.cpu.threads}</h3>
            </div>
          </div>
        </div>
        <div className="details-divider2"></div>
        <div className="details-third-row">
          <div className="second-row-elements">
            <div className="stuff-details-key">
              <h3>ლეპტოპის მდგომარეობა</h3>
              <h3>ლეპტოპის ფასი</h3>
            </div>
            <div className="stuff-details">
              <h3>{listItem.laptop.state === "new" ? "ახალი" : "მეორადი"}</h3>
              <h3>{listItem.laptop.price} ₾</h3>
            </div>
          </div>
          <div className="second-row-elements">
            <div className="stuff-details-key">
              <h3>შეძენის რიცხვი:</h3>
            </div>
            <div className="stuff-details">
              <h3>
                {listItem.laptop.purchase_date
                  ? listItem.laptop.purchase_date.replace(/-/g, " / ")
                  : null}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
