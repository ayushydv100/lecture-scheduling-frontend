import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { createCourse, getInstructers } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const AddCourse = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    level: "",
    photo: "",
    instructers: [],
    loading: false,
    error: "",
    createdCourse: "",
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    level,
    photo,
    instructers,
    loading,
    error,
    createdCourse,
    getRedirect,
    formData,
  } = values;

  const preload = () => {
    getInstructers().then((data) => {
      //   console.log(data);
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, instructers: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createCourse(user._id, token, formData).then((data) => {
      console.log("createdCourse value:", data.name);
      console.log(data);
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          level: "",
          photo: "",
          loading: false,
          createdCourse: data.name,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => {
    return (
      <div className="mt-3" style={{ display: createdCourse ? "" : "none" }}>
        <h4>{createdCourse} created successfully</h4>
      </div>
    );
  };

  const warningMessage = () => (
    <div className="mt-3" style={{ display: error ? "" : "none" }}>
      <h4>{createdCourse} creation failed</h4>
    </div>
  );

  const createCourseForm = () => (
    <form>
      <span>Photo</span>
      <div className="form-group">
        <label className="btn btn-block light-bg">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("level")}
          type="number"
          className="form-control"
          placeholder="level"
          value={level}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn text-white mb-4 light-bg"
      >
        Add Course
      </button>
    </form>
  );

  return (
    <Base
      title="Add a course"
      description="Add new course here"
      className="container p-4"
    >
      <div className="text-white rounded">
        <Link to="/admin/dashboard" className=" btn mb-3 m-4 btn-outline-info">
          Admin Home
        </Link>
        <div className="row text-white">
          <div className="col-md-8 offset-md-2">
            {successMessage()}
            {warningMessage()}
            {createCourseForm()}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default AddCourse;
