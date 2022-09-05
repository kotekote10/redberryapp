import React from "react";
import goback from "../imgs/backarrow.png";
import redlogo from "../imgs/redlogo.png";
import mobileback from "../imgs/mobilebackarrow.png";
import { TextField, Select, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function StuffInfo({ teamsOptions, positionsData, setData }) {
  let navigate = useNavigate();
  const [formErrors, setFormErrors] = React.useState({});

  const [formData, setFormData] = React.useState(
    JSON.parse(localStorage.getItem("forms")) || {
      name: "",
      surname: "",
      team_id: 0,
      position_id: 0,
      phone_number: "+995 5",
      email: "",
    }
  );
  React.useEffect(() => {
    localStorage.setItem("forms", JSON.stringify(formData));
  }, [formData]);
  const sortPositionsData = positionsData.filter((sorted) => {
    return sorted.team_id === formData.team_id;
  });

  const positionsOptions = sortPositionsData.map((option) => {
    return (
      <MenuItem key={option.id} value={option.id}>
        {option.name}
      </MenuItem>
    );
  });
  function handleChange(event) {
    console.log(formData);
    setFormData((prev) => {
      const { name, value } = event.target;
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const errors = validate(formData);
    setFormErrors(errors);

    setData((prev) => {
      return { ...prev, formData };
    });

    if (Object.keys(errors).length === 0) {
      navigate("/laptop");
    }
  }

  function validate(values) {
    const errors = {};
    const onlyGeorgian = /^[ა-ჰ]+$/;
    const onlyNumbers = /^[0-9_  -+]*$/;
    const emailValidation = /^([\w]*[\w\.]*(?!\.)@redberry.ge)/;
    if (!values.name) {
      errors.name = "ველის შევსება სავალდებულია";
    } else if (!onlyGeorgian.test(values.name)) {
      errors.name = "გამოიყენე ქართული ასოები";
    } else if (values.name.length < 2) {
      errors.name = "გამოიყენე მინიმუმ 2 სიმბოლო";
    }
    if (!values.surname) {
      errors.surname = "ველის შევსება სავალდებულია";
    } else if (!onlyGeorgian.test(values.surname)) {
      errors.surname = "გამოიყენე ქართული ასოები";
    } else if (values.surname.length < 2) {
      errors.surname = "გამოიყენე მინიმუმ 2 სიმბოლო";
    }
    if (!values.team_id) {
      errors.team_id = "team_id is required";
    }
    if (!values.position_id) {
      errors.position_id = "position_id is required";
    }
    if (!values.email) {
      errors.email = "ველის შევსება სავალდებულოა";
    } else if (!emailValidation.test(values.email)) {
      errors.email =
        "მეილი უნდა შედგებოდეს ლათინური ასოებისგან და მთავრდებოდეს @redberry.ge-ით";
    }
    if (!values.phone_number) {
      errors.phone_number = "ველის შევსება სავალდებულოა";
    } else if (!onlyNumbers.test(values.phone_number)) {
      errors.phone_number =
        "არ აკმაყოფილებს ქართული მობ-ნომრის ფორმატს (გამოიყენე მხოლოდ ციფრები)";
    } else if (formData.phone_number.length < 7) {
      errors.phone_number = "ველის შევსება სავალდებულოა";
    } else if (values.phone_number.replace(/[^0-9]/g, "").length != 12) {
      errors.phone_number =
        "არ აკმაყოფილებს ქართული მობ-ნომრის ფორმატს (ციფრების რაოდენობა არ ემთხვევა ფორმატს)";
    }
    return errors;
  }

  return (
    <div className="formpages-container1">
      <div className="page1">
        <Link to="/">
          <img src={goback} className="goback" />
        </Link>
        <div className="form1-header">
          <div>
            <Link to="/" className="mobback">
              <img src={mobileback} className="mobback" />
            </Link>
            <h1>თანამშრომლების ინფო</h1>
            <h1 className="onetwo">1/2</h1>
            <hr
              className="phone-no-show"
              style={{
                borderRadius: "8px",
                width: "155px",
              }}
            />
          </div>
          <h1 className="phone-no-show">ლეპტოპის მახასიათებლები</h1>
        </div>
        <div className="form1-container">
          <form className="form1" onSubmit={handleSubmit} autoComplete="off">
            <div className="firstlast-container">
              <div>
                <h4 className="textfield-headers">სახელი</h4>
                <TextField
                  className="firstlast-input"
                  type="text"
                  name="name"
                  error={formErrors.name}
                  onChange={handleChange}
                  value={formData.name}
                  helperText={
                    formErrors.name
                      ? formErrors.name
                      : "მინიმუმ 2 სიმბოლო, ქართული ასოები"
                  }
                />
              </div>
              <div>
                <h4 className="textfield-headers">გვარი</h4>
                <TextField
                  className="firstlast-input"
                  type="text"
                  name="surname"
                  error={formErrors.surname}
                  onChange={handleChange}
                  value={formData.surname}
                  helperText={
                    formErrors.surname
                      ? formErrors.surname
                      : "მინიმუმ 2 სიმბოლო, ქართული ასოები"
                  }
                />
              </div>
            </div>
            <Select
              className="stuff-select"
              id="team_id"
              value={formData.team_id}
              name="team_id"
              onChange={handleChange}
              error={formErrors.team_id}
              defaultValue={0}
            >
              <MenuItem value={0}>თიმი</MenuItem>
              {teamsOptions}
            </Select>
            <Select
              className="stuff-select"
              id="position_id"
              value={formData.position_id}
              name="position_id"
              onChange={handleChange}
              error={formErrors.position_id}
              defaultValue={0}
            >
              <MenuItem value={0}>პოზიცია</MenuItem>
              {positionsOptions}
            </Select>

            <div>
              <h4 className="textfield-headers">მეილი</h4>
              <TextField
                className="email"
                type="text"
                name="email"
                error={formErrors.email}
                onChange={handleChange}
                value={formData.email}
                helperText={
                  formErrors.email
                    ? formErrors.email
                    : "უნდა მთავრდებოდეს @redberry.ge-ით"
                }
              />
            </div>
            <div>
              <h4 className="textfield-headers">ტელეფონის ნომერი</h4>
              <TextField
                type="text"
                className="phonenumber"
                name="phone_number"
                error={formErrors.phone_number}
                onChange={handleChange}
                value={formData.phone_number}
                helperText={
                  formErrors.phone_number
                    ? formErrors.phone_number
                    : "უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს"
                }
                onKeyDown={(e) => {
                  formData.phone_number.length === 6 &&
                    e.key === "Backspace" &&
                    e.preventDefault();
                  Number(e.key) === NaN && e.preventDefault();
                }}
              />
            </div>

            <button className="button-next" type="submit">
              შემდეგი
            </button>
          </form>
        </div>
        <img src={redlogo} className="redlogo1" />
      </div>
    </div>
  );
}
