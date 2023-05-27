import React, { useState, useEffect } from "react";
import "./App.css";
import { helpHttp } from "./helpers/helpHttp";
import { FormCrud } from "./components/form-crud";
import { TableCrud } from "./components/table-crud";
import { Loader } from "./components/loader";
import { Message } from "./components/message";
import { nanoid } from "nanoid";

function App() {
  const [db, setData] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const api = helpHttp();
  let url = "http://localhost:5000/ireland";

  useEffect(() => {
    setLoading(true);

    helpHttp()
      .get(url)
      .then((res) => {
        if (!res.err) {
          setData(res);
          setError(null);
        } else {
          setData(null);
          setError(res);
        }

        setLoading(false);
      });
  }, [url]);

  const createData = (data) => {
    data.id = Date.now();
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.post(url, options).then((res) => {
      if (!res.err) {
        setData([...db, res]);
      } else {
        setError(res);
      }
    });
  };

  const updateData = (data) => {
    let endpoint = `${url}/${data.id}`;

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.put(endpoint, options).then((res) => {
      if (!res.err) {
        let newData = db.map((el) => (el.id === data.id ? data : el));
        setData(newData);
      } else {
        setError(res);
      }
    });
  };

  const deleteData = (id) => {
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el id '${id}'?`
    );

    if (isDelete) {
      let endpoint = `${url}/${id}`;
      let options = {
        headers: { "content-type": "application/json" },
      };

      api.del(endpoint, options).then((res) => {
        if (!res.err) {
          let newData = db.filter((el) => el.id !== id);
          setData(newData);
        } else {
          setError(res);
        }
      });
    } else {
      return;
    }
  };

  return (
    <>
      <div className="title-container">
        <img
          className="gaa-logo"
          src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Logo_of_GAA.svg/1200px-Logo_of_GAA.svg.png"
          alt="gaa-logo"
        />
        <h3>{dataToEdit ? "Edit" : "Add"}</h3>
      </div>
      <div className="grid-1-2">
        <FormCrud
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        {loading && <Loader />}
        {error && (
          <Message
            msg={`Error ${error.status}: ${error.statusText}`}
            bgColor="#dc3545"
          />
        )}
        {db && (
          <TableCrud
            data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        )}
      </div>
    </>
  );
}

export default App;
