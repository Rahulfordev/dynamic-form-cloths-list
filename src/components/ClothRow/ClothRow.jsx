import { useEffect, useState } from "react";
import "./clothrow.css";
import ClothTable from "../ClothTable/ClothTable";

const getClothFormLocalstorage = () => {
  const data = localStorage.getItem("cloth");
  return data ? JSON.parse(data) : [];
};

const ClothRow = () => {
  const [inputs, setInput] = useState(getClothFormLocalstorage());
  const handleSubmit = (event) => {
    event.preventDefault();

    const inputValues = {};
    const inputElements = [...event.target.elements];
    inputElements.forEach((element) => {
      if (element.tagName !== "BUTTON") {
        return (inputValues[element.name] = element.value);
      }
      setInput([...inputs, inputValues]);
      element.value = "";
    });
  };

  // delete Cloth
  const handleDelete = (id) => {
    const filterCloth = inputs.filter((input) => input.clothId !== id);
    setInput(filterCloth);
  };

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
              min="2"
              max="15"
              name="clothQuantity"
              id="clothQuantity"
              required
              placeholder="Enter Cloth Quantity"
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
            <p>Select Coloth Size:</p>
            <div className="clothSize">
              <label htmlFor="m-size">
                <input
                  value=""
                  type="radio"
                  name="clothSize"
                  id="m-size"
                  required
                  placeholder=""
                />{" "}
                M
              </label>
              <label htmlFor="l-size">
                <input
                  value=""
                  type="radio"
                  name="clothSize"
                  id="l-size"
                  required
                  placeholder=""
                />{" "}
                L
              </label>
              <label htmlFor="xl-size">
                <input
                  value=""
                  type="radio"
                  name="clothSize"
                  id="xl-size"
                  required
                  placeholder=""
                />{" "}
                XL
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
          <table>
            <tr>
              <th>Cloth ID</th>
              <th>Cloth Name</th>
              <th>Price</th>
              <th>Cloth Quantity</th>
              <th>Cloth Color</th>
              <th>Coloth Size</th>
              <th>Manufacture Date</th>
              <th>Description</th>
              <th>Delete</th>
            </tr>
            {inputs.map((input) => (
              <ClothTable
                key={input.clothId}
                handleDelete={handleDelete}
                input={input}
              />
            ))}
          </table>
          <div className="remove__all-button">
            <button className="remove-all" onClick={() => setInput([])}>
              Remove All Cloth
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClothRow;
