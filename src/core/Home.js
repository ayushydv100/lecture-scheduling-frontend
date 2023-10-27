import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../../src/backend";
import Base from "./Base";
import Card from "./Card";
import { getCourses } from "./helper/coreapicalls";

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(false);

  const loadAllCourses = () => {
    getCourses().then((data) => {
      if (data && data.error) {
        setError(data.error);
      } else {
        setCourses(data);
      }
    });
  };

  useEffect(() => {
    loadAllCourses();
  }, []);

  return (
    <Base
      title="Course"
      description="Find your favourite courses"
      className="bold-text"
    >
      <div className="row text-center p-4 custom-style">
        <h1 className="text-white ml-4 mb-3">All Courses</h1>
        <div className="row m-2">
          {courses.map((course, index) => {
            return (
              <div key={index} className="col-3 mb-4">
                <Card course={course} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}
