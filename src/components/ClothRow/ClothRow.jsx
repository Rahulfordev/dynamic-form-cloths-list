import { useEffect, useState } from "react";
import "./clothrow.css";
import ClothTable from "../ClothTable/ClothTable";
import { getClothFormLocalstorage } from "../database/DataBase";

const ClothRow = () => {
  const [inputs, setInput] = useState(getClothFormLocalstorage());
  let clothPushIDd = [];

  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log(event.targe);
    const inputValues = {};
    const inputElements = [...event.target.elements];
    inputElements.forEach((element) => {
      // console.log(element.value);
      if (element.name === "clothId") {
        // console.log(element.value, "calue");
        const b = inputs.filter((inputID) => inputID.clothId === element.value);
        clothPushIDd.push(...b);
      }

      // console.log(clothPushIDd);
      // if (element.clothId === event.target.clothId) {
      //   console.log("id");
      // }

      if (element.tagName !== "BUTTON") {
        // Cloth Size add
        if (element.type === "radio" && element.checked) {
          inputValues[element.name] = element.value;
        } else if (element.type !== "radio") {
          inputValues[element.name] = element.value;
        }
      }
    });

    // same ID check
    if (clothPushIDd.length > 0) {
      alert("You can't add same ID 🥲");
      clothPushIDd.length = 0;
      event.target.reset();
      // event.target = "";
      return;
    }

    // price and quantity check
    if (inputValues.clothPrice <= 0) {
      return alert("Price must be greater than 0");
    } else if (inputValues.clothQuantity <= 0) {
      return alert("Quantity must be greater than 0");
    } else {
      // console.log(inputValues);
      setInput([...inputs, inputValues]);
      event.target.reset();
      // event.target = "";
      // event.target.elements.value = "";
      // console.log();
    }
  };

  // delete Cloth
  const handleDelete = (id) => {
    const filterCloth = inputs.filter((input) => input.clothId !== id);
    setInput(filterCloth);
  };

  // localStorage add
  useEffect(() => {
    localStorage.setItem("cloth", JSON.stringify(inputs));
  }, [inputs]);

  return (
    <div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form" action="">
          <div>
            <label htmlFor="clothId">Cloth ID:</label>
            <input
              type="text"
              name="clothId"
              id="clothId"
              required
              placeholder="Enter Cloth ID"
            />
          </div>
          <div>
            <label htmlFor="name">Cloth Name:</label>
            <input
              className="product-name"
              type="text"
              name="name"
              id="name"
              placeholder="Enter Product Name"
              required
            />
          </div>
          <div>
            <label htmlFor="clothPrice">Price:</label>
            <input
              type="number"
              name="clothPrice"
              id="clothPrice"
              required
              placeholder="Enter Cloth Price"
            />
          </div>
          <div>
            <label htmlFor="clothQuantity">Cloth Quantity:</label>
            <input
              type="number"
              min="1"
              max="15"
              name="clothQuantity"
              id="clothQuantity"
              placeholder="Enter Cloth Quantity"
              required
            />
          </div>
          <div>
            <label htmlFor="clothColor">Choose a Color:</label>
            <select id="clothColor" name="clothColor">
              <option value="Choose Color">Choose Color</option>
              <option value="Red">red</option>
              <option value="Blue">blue</option>
              <option value="Green">green</option>
            </select>
          </div>

          <div className="cloth-size">
            <p>Select Cloth Size:</p>
            <div className="clothSize-container">
              <label htmlFor="M">
                <input type="radio" name="clothSize" value="M" required /> M
              </label>
              <label htmlFor="L">
                <input type="radio" name="clothSize" value="L" required /> L
              </label>
              <label htmlFor="XL">
                <input type="radio" name="clothSize" required value="XL" /> XL
              </label>
            </div>
          </div>
          <div>
            <label htmlFor="date">Manufacture Date:</label>
            <input type="date" id="date" name="date" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              placeholder="Enter Cloth Description"
              style={{ resize: "none" }}
              name="description"
              id="description"
            ></textarea>
          </div>
          <div>
            <input required type="checkbox" id="checkbox" name="checkbox" />{" "}
            <label htmlFor="checkbox">I accept all terms and conditions.</label>
          </div>
          <div>
            <button className="submit-button">Add Cloud Info</button>
          </div>
        </form>
        <div className="cloth-table">
          {inputs.length > 0 ? (
            <div>
              <table>
                <tr>
                  <th>Cloth ID</th>
                  <th>Cloth Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>M. Date</th>
                  <th>Description</th>
                  <th>Delete</th>
                </tr>
                {inputs.map((input) => (
                  <ClothTable
                    key={input.clothId}
                    input={input}
                    handleDelete={handleDelete}
                  />
                ))}
              </table>
              <div className="remove__all-button">
                <button className="remove-all" onClick={() => setInput([])}>
                  Remove All Cloth
                </button>
              </div>
            </div>
          ) : (
            <div className="empty-cloth">
              <h1>No Clothes added</h1>
              <img
                src="https://media.tenor.com/Y3c23UQQ3MIAAAAC/empty-box.gif"
                alt=""
                style={{ width: "300px" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClothRow;
