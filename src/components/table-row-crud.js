import React from "react";

export const TableRowCrud = ({ el, setDataToEdit, deleteData }) => {
  let { id, badge, team, province, titles } = el;

  return (
    <>
      <tr>
        <td>
          <img src={badge} alt={team.toLowerCase() + "-badge"} />
        </td>
        <td>{team}</td>
        <td>{province}</td>
        <td>{titles}</td>
        <td>
          <button onClick={() => setDataToEdit(el)}>Edit</button>
          <button onClick={() => deleteData(id)}>Delete</button>
        </td>
      </tr>
    </>
  );
};
