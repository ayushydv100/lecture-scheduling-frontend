import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  createLecture,
  getInstructers,
  getCourses,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const AddLecture = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    date: "",
    instructers: [],
    instructer: false,
    courses: [],
    course: false,
    loading: false,
    error: "",
    createdLecture: "",
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    instructers,
    instructer,
    courses,
    course,
    date,
    loading,
    error,
    createdLecture,
    getRedirect,
    formData,
  } = values;

  const preload = () => {
    getInstructers().then((instructerData) => {
      console.log(instructerData);
      if (instructerData && instructerData.error) {
        setValues({ ...values, error: instructerData.error });
      } else {
        setValues((prevState) => ({
          ...prevState,
          instructers: instructerData,
          formData: new FormData(),
        }));
      }
    });

    getCourses().then((courseData) => {
      console.log(courseData);
      if (courseData && courseData.error) {
        setValues({ ...values, error: courseData.error });
      } else {
        setValues((prevState) => ({
          ...prevState,
          courses: courseData,
          formData: new FormData(),
        }));
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createLecture(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          date: "",
          loading: false,
          createdLecture: data.name,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div className="mt-3" style={{ display: createdLecture ? "" : "none" }}>
      <h4>{createdLecture} created successfully</h4>
    </div>
  );

  const warningMessage = () => (
    <div className="mt-3" style={{ display: error ? "" : "none" }}>
      <h4>{createdLecture} creation failed</h4>
    </div>
  );

  const createLectureForm = () => (
    <form>
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
        <select
          onChange={handleChange("course")}
          className="form-control"
          placeholder="course"
        >
          <option>Select</option>
          {courses &&
            courses.map((course, index) => (
              <option key={index} value={course._id}>
                {course.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("instructer")}
          className="form-control"
          placeholder="instructer"
        >
          <option>Select</option>
          {instructers &&
            instructers.map((inst, index) => (
              <option key={index} value={inst._id}>
                {inst.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          type="date" // Change the input type to "date"
          onChange={handleChange("date")}
          name="date"
          className="form-control"
          placeholder="Name"
          value={date}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn text-white mb-4 light-bg"
      >
        Add Lecture
      </button>
    </form>
  );

  return (
    <Base
      title="Add Lecture"
      description="Add a new Lecture here"
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
            {createLectureForm()}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default AddLecture;
