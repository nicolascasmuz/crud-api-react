import React, { useState, useEffect } from "react";

const initialState = {
  id: null,
  badge: "",
  team: "",
  province: "",
  titles: "",
};

export const FormCrud = ({
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
}) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    } else {
      setForm(initialState);
    }
  }, [dataToEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.badge || !form.team || !form.province || !form.titles) {
      alert("Datos incompletos");
      return;
    }

    if (form.id === null) {
      createData(form);
    } else {
      updateData(form);
    }

    handleReset();
  };

  const handleReset = (e) => {
    setForm(initialState);
    setDataToEdit(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="badge"
          placeholder="Badge"
          onChange={handleChange}
          value={form.badge}
        />
        <input
          type="text"
          name="team"
          placeholder="Team"
          onChange={handleChange}
          value={form.team}
        />
        <input
          type="text"
          name="province"
          placeholder="Province"
          onChange={handleChange}
          value={form.province}
        />
        <input
          type="text"
          name="titles"
          placeholder="Titles"
          onChange={handleChange}
          value={form.titles}
        />
        <input type="submit" value="Submit" />
        <input type="reset" value="Reset" onClick={handleReset} />
      </form>
    </>
  );
};
