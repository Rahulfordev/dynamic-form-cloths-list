/* eslint-disable react/prop-types */
import { RiDeleteBin6Line } from "react-icons/ri";

const ClothTable = ({ input, handleDelete }) => {
  //   console.log(input);
  return (
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
  );
};

export default ClothTable;
