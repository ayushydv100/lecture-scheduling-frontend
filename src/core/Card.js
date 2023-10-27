import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom/";

const Card = ({
  course,
  viewCourseButton = true,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [lectures, setLectures] = useState(false);
  const [count, setCount] = useState(course.count);
  const [selectedCourseID, setSelectedCourseID] = useState(null);

  const cardTitle = course ? course.name : "Default title";
  const cardDescription = course ? course.description : "Default description";
  const cartLevel = course ? course.level : "Default level";

  const viewCourse = () => {
    handleCourseClick(course, () => setRedirect(true));
  };

  const handleCourseClick = (courseId) => {
    // Fetch lectures for the selected course
    // setSelectedCourseID(course._id);

    // Redirect to the lectures URL after fetching data
    setRedirect(true);
    // fetch(`http://localhost:8000/api/lectures/${course._id}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setLectures(data);
    //   })
    //   .catch((error) => console.error("Error fetching lectures", error));
  };

  return (
    <div className="card text-white border border-info card-container">
      <div className="card-header lead card-header custom-course-name">
        {cardTitle}
      </div>
      <div className="card-body">
        {redirect && <Redirect to={`/lectures/${course._id}`} />}
        <ImageHelper course={course} />
        <p className="lead card-description">{cardDescription}</p>
        <p className="btn rounded  btn-sm px-4 card-Level">
          Level: {cartLevel}
        </p>
        <div className="row row-container">
          <div className="col-12">
            {viewCourseButton && (
              <button
                key={course._id}
                onClick={() => handleCourseClick(course._id)}
                className="btn btn-block card-button"
              >
                View Course
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
