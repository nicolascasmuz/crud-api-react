import React from "react";
import { TableRowCrud } from "./table-row-crud";

export const TableCrud = ({ data, setDataToEdit, deleteData }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Badge</th>
            <th>Team</th>
            <th>Province</th>
            <th>Titles</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((el) => (
              <TableRowCrud
                key={el.id}
                el={el}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
              />
            ))
          ) : (
            <tr>
              <td colSpan="3">Sin datos</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
