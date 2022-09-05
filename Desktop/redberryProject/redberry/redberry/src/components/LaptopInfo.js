import React from "react";
import goback from "../imgs/backarrow.png";
import redlogo from "../imgs/redlogo.png";
import error from "../imgs/error.png";
import lari from "../imgs/lari.png";
import checkphoto from "../imgs/checkphoto.png";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  makeStyles,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";

export default function LaptopInfo({ brandsOptions, cpusOptions, data }) {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = React.useState({});

  const [formData, setFormData] = React.useState(
    JSON.parse(localStorage.getItem("forms")) || {
      laptop_name: "",
      laptop_image: "",
      laptop_brand_id: "",
      laptop_cpu: "",
      laptop_cpu_cores: null,
      laptop_cpu_threads: null,
      laptop_ram: null,
      laptop_hard_drive_type: "",
      laptop_state: "",
      laptop_purchase_date: "",
      laptop_price: null,
    }
  );
  React.useEffect(() => {
    localStorage.setItem("forms", JSON.stringify(formData));
  }, [formData]);

  function handleChange(event) {
    setFormData((prev) => {
      const { name, value } = event.target;
      return {
        ...prev,
        [name]: event.target.type === "number" ? parseInt(value) : value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.clear();
    const errors = validate(formData);
    setFormErrors(errors);

    const uploadData = {
      ...data,
      ...formData,
      token: "eedbce2b7655ae68ac6493a419221b59",
    };

    const sendData = new FormData();
    Object.entries(uploadData).forEach(([k, v]) => sendData.append(k, v));
    fetch("https://pcfy.redberryinternship.ge/api/laptop/create", {
      method: "POST",
      body: sendData,
    }).then((response) => {
      if (Object.keys(errors).length === 0) {
        navigate("/finish");
      }
    });
  }

  const [selectedImage, setSelectedImage] = React.useState(false);

  function changeImg(e) {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(true);
      setFormData((prev) => {
        return {
          ...prev,
          laptop_image: e.target.files[0],
        };
      });
    }
  }

  function validate(values) {
    const errors = {};
    const engNumSym = /^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z0-9-]+$/;
    const onlyGeorgian = /^[ა-ჰ]+$/;
    const onlyNumbers = /^[0-9_ ]*$/;
    const emailValidation = /^([\w]*[\w\.]*(?!\.)@redberry.ge)/;
    if (!values.laptop_name) {
      errors.laptop_name = "ველის შევსება სავალდებულია";
    } else if (!engNumSym.test(values.laptop_name)) {
      errors.laptop_name =
        "შესაძლებელია შეიცავდეს მხოლოდ ლათინურ სიმბოლოებს, ციფრებსა და !@#$%^&*()_+=";
    }
    if (!values.laptop_image) {
      errors.laptop_image = "ველის შევსება სავალდებულია";
    }
    if (!values.laptop_brand_id) {
      errors.laptop_brand_id = "ველის შევსება სავალდებულია";
    }
    if (!values.laptop_cpu) {
      errors.laptop_cpu = "ველის შევსება სავალდებულია";
    }
    if (!values.laptop_cpu_cores) {
      errors.laptop_cpu_cores = "ველის შევსება სავალდებულია";
    } else if (!onlyNumbers.test(values.laptop_cpu_cores)) {
      errors.laptop_cpu_cores = "გამოიყენე მხოლოდ რიცხვები";
    }
    if (!values.laptop_cpu_threads) {
      errors.laptop_cpu_threads = "ველის შევსება სავალდებულია";
    } else if (!onlyNumbers.test(values.laptop_cpu_threads)) {
      errors.laptop_cpu_threads = "გამოიყენე მხოლოდ რიცხვები";
    }
    if (!values.laptop_ram) {
      errors.laptop_ram = "ველის შევსება სავალდებულია";
    } else if (!onlyNumbers.test(values.laptop_ram)) {
      errors.laptop_ram = "გამოიყენე მხოლოდ რიცხვები";
    }
    if (!values.laptop_hard_drive_type) {
      errors.laptop_hard_drive_type = "ველის შევსება სავალდებულია";
    }
    if (!values.laptop_state) {
      errors.laptop_state = "ველის შევსება სავალდებულია";
    }
    if (!values.laptop_price) {
      errors.laptop_price = "ველის შევსება სავალდებულია";
    } else if (!onlyNumbers.test(values.laptop_price)) {
      errors.laptop_price = "გამოიყენე მხოლოდ რიცხვები";
    }
    return errors;
  }
  console.log(formData.laptop_image);
  return (
    <div className="formpages-container2">
      <div className="page2">
        <Link to="/stuff">
          <img src={goback} className="goback2" />
        </Link>

        <div className="form2-header">
          <h1>თანამშრომლების ინფო</h1>
          <div>
            <h1>ლეპტოპის მახასიათებლები</h1>
            <hr style={{ color: "black", width: "210px" }} />
          </div>
        </div>
        <div className="form2-container">
          <form className="form2" onSubmit={handleSubmit} autoComplete="off">
            {selectedImage === true ? (
              <div className="submit-photo">
                <img
                  src={URL.createObjectURL(formData.laptop_image)}
                  className="uploaded-image"
                />
                <div className="image-name-size">
                  <img src={checkphoto} className="checkphoto" />
                  <p> {formData.laptop_image.name},</p>
                  <p> {formData.laptop_image.size * 1e-6}mb</p>
                </div>
                <button
                  className="addphoto-again"
                  onClick={() => setSelectedImage(false)}
                >
                  თავიდან ატვირთე
                </button>
              </div>
            ) : (
              <div
                className={
                  formErrors.laptop_image
                    ? "submit-photo-error"
                    : "submit-photo"
                }
              >
                <div className={"submit-photo-text"}>
                  {formErrors.laptop_image ? (
                    <div className="photo-error">
                      <img src={error} className="photo-error-pic" />
                      <h3>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</h3>
                    </div>
                  ) : (
                    <h3>ჩააგდე ან ატვირთე ლეპტოპის ფოტო</h3>
                  )}
                </div>
                <label className="submitphotolabel">
                  <h3>ატვირთე</h3>
                  <input
                    type="file"
                    className="submitphotobtn"
                    name="laptop_image"
                    accept="image/*"
                    onChange={changeImg}
                  />
                </label>
              </div>
            )}
            <div className="laptop-namebrand">
              <div>
                <h3 className="textfield-headers">ლეპტოპის სახელი</h3>
                <TextField
                  className="laptop-name"
                  type="text"
                  name="laptop_name"
                  error={formErrors.laptop_name}
                  onChange={handleChange}
                  value={formData.laptop_name}
                  helperText={
                    formErrors.laptop_name
                      ? formErrors.laptop_name
                      : "ლათინური ასოები, ციფრები, !@#$%^&*()_+="
                  }
                />
              </div>
              <Select
                displayEmpty
                className="select-brand"
                id="laptop_brand_id"
                value={formData.laptop_brand_id}
                name="laptop_brand_id"
                onChange={handleChange}
                error={formErrors.laptop_brand_id}
                defaultValue=""
              >
                <MenuItem value={""} className="menuitem">
                  ლეპტოპის ბრენდი
                </MenuItem>
                {brandsOptions}
              </Select>
            </div>
            <div className="hrbellow-laptop-name"></div>
            <div className="cpu-info">
              <Select
                displayEmpty
                className="select-cpu"
                id="laptop_cpu"
                value={formData.laptop_cpu}
                name="laptop_cpu"
                onChange={handleChange}
                error={formErrors.laptop_cpu}
                defaultValue=""
              >
                <MenuItem value={""} className="menuitem">
                  CPU
                </MenuItem>
                {cpusOptions}
              </Select>
              <div className="cpu-text-container">
                <h3 className="textfield-headers">CPU-ს ბირთვი</h3>
                <TextField
                  className="cpu-text"
                  type="number"
                  name="laptop_cpu_cores"
                  error={formErrors.laptop_cpu_cores}
                  onChange={handleChange}
                  value={formData.laptop_cpu_cores}
                  helperText={
                    formErrors.laptop_cpu_cores
                      ? formErrors.laptop_cpu_cores
                      : "მხოლოდ ციფრები"
                  }
                />
              </div>
              <div className="cpu-text-container">
                <h3 className="textfield-headers">CPU-ს ნაკადი</h3>
                <TextField
                  className="cpu-text"
                  type="number"
                  name="laptop_cpu_threads"
                  error={formErrors.laptop_cpu_threads}
                  onChange={handleChange}
                  value={formData.laptop_cpu_threads}
                  helperText={
                    formErrors.laptop_cpu_threads
                      ? formErrors.laptop_cpu_threads
                      : "მხოლოდ ციფრები"
                  }
                />
              </div>
            </div>
            <div className="ram">
              <div>
                <h3 className="textfield-headers">ლეპტოპის RAM (GB)</h3>
                <TextField
                  className="ram-text"
                  type="number"
                  name="laptop_ram"
                  error={formErrors.laptop_ram}
                  onChange={handleChange}
                  value={formData.laptop_ram}
                  helperText={
                    formErrors.laptop_ram
                      ? formErrors.laptop_ram
                      : "მხოლოდ ციფრები"
                  }
                />
              </div>

              <FormControl className="laptop-ram">
                {formErrors.laptop_hard_drive_type ? (
                  <div className="radio-error">
                    <h3>მეხსიერების ტიპი</h3>
                    <img src={error} className="radio-error-pic" />
                  </div>
                ) : (
                  <h3>მეხსიერების ტიპი</h3>
                )}

                <RadioGroup
                  className="ram-radios"
                  name="laptop_hard_drive_type"
                  value={formData.laptop_hard_drive_type}
                  onChange={handleChange}
                  row
                >
                  <FormControlLabel
                    value="SSD"
                    control={<Radio />}
                    label="SSD"
                  />
                  <div className="divider"></div>
                  <FormControlLabel
                    value="HDD"
                    control={<Radio />}
                    label="HDD"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="hrbellow-ram"></div>

            <div className="date-price">
              <div>
                <h3 className="textfield-headers">შეძენის რიცხვი (არჩევითი)</h3>

                <TextField
                  className="date"
                  type="date"
                  name="laptop_purchase_date"
                  value={formData.laptop_purchase_date}
                  onChange={handleChange}
                />
              </div>
              <div>
                <h3 className="textfield-headers">ლეპტოპის ფასი</h3>

                <TextField
                  className="price"
                  type="number"
                  name="laptop_price"
                  error={formErrors.laptop_price}
                  onChange={handleChange}
                  value={formData.laptop_price}
                  helperText={
                    formErrors.laptop_price
                      ? formErrors.laptop_price
                      : "მხოლოდ ციფრები"
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton disableRipple={false} size="small">
                          <img src={lari} className="lari-icon" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            <FormControl className="laptop-condition">
              {formErrors.laptop_state ? (
                <div className="radio-error">
                  <h3>ლეპტოპის მდგომარეობა</h3>
                  <img src={error} className="radio-error-pic" />
                </div>
              ) : (
                <h3>ლეპტოპის მდგომარეობა</h3>
              )}
              <RadioGroup
                name="laptop_state"
                value={formData.laptop_state}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="new"
                  control={<Radio />}
                  label="ახალი"
                />
                <div className="divider"></div>

                <FormControlLabel
                  value="used"
                  control={<Radio />}
                  label="მეორადი"
                />
              </RadioGroup>
            </FormControl>
            <Link to="/stuff" className="back-text">
              <h3>უკან</h3>
            </Link>

            <button className="save-laptop-info">დამახსოვრება</button>
          </form>
        </div>
        <img src={redlogo} className="redlogo2" />
      </div>
    </div>
  );
}
