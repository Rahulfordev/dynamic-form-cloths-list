import { useEffect, useState } from "react";
import "./clothrow.css";
import { RiDeleteBin6Line } from "react-icons/ri";

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
        inputValues[element.name] = element.value;
      }
    });

    if (inputValues.clothPrice <= 0) {
      return alert("Price must be greater than 0");
    } else if (inputValues.clothQuantity <= 0) {
      return alert("Quantity must be greater than 0");
    } else if (inputValues.clothId <= 0) {
      return alert("Cloth Id must be greater than 0");
    } else {
      setInput([...inputs, inputValues]);
      event.target.reset();
    }
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
            <p>Select Cloth Size:</p>
            <div className="clothSize-container">
              <label htmlFor="M">
                <input
                  value=""
                  type="radio"
                  name="clothSize"
                  id="M"
                  required
                  placeholder=""
                />{" "}
                M
              </label>
              <label htmlFor="L">
                <input
                  value=""
                  type="radio"
                  name="clothSize"
                  id="L"
                  required
                  placeholder=""
                />{" "}
                L
              </label>
              <label htmlFor="XL">
                <input
                  value=""
                  type="radio"
                  name="clothSize"
                  id="XL"
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
              <tr key={input.clothId}>
                <td>{input.clothId}</td>
                <td>{input.name}</td>
                <td>{input.clothPrice * input.clothQuantity}</td>
                <td>{input.clothQuantity}</td>
                <td>{input.clothColor}</td>
                <td>{input.clothSize}</td>
                <td>{input.date}</td>
                <td>{input.description}</td>
                <td>
                  <RiDeleteBin6Line
                    onClick={() => handleDelete(input.clothId)}
                    color="red"
                  />
                </td>
              </tr>
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
