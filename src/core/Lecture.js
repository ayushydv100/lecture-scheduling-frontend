import { useEffect, useState } from "react";
import Base from "./Base";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const Lecture = () => {
  const params = useParams();
  console.log({ params });
  const [lectures, setLectures] = useState([]);

  const handleCourseClick = (courseId) => {
    // Fetch lectures for the selected course
    fetch(`http://localhost:8000/api/lectures/${courseId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });
        setLectures(data);
        // setSelectedCourseID(course._id);

        // Redirect to the lectures URL after fetching data
        // setRedirect(true);
      })
      .catch((error) => console.error("Error fetching lectures", error));
  };
  useEffect(() => {
    handleCourseClick(params.course);
  }, []);

  return (
    <Base title="Lectures:">
      <h2 className="mb-4">All Lectures:</h2>
      <div className="row p-4">
        <div className="col-12">
          {lectures.length === 0 ? (
            <p>No lectures available.</p>
          ) : (
            lectures.map((lecture, index) => {
              console.log({ lecture, index });
              return (
                <div
                  key={index}
                  className="row text-center mb-2 lecture-container"
                >
                  <div className="col-4">
                    <h3 className="text-white text-left">{lecture.name}</h3>
                  </div>
                  <div className="col-4">
                    <h3 className="text-white text-left">
                      {lecture.instructer.name}
                    </h3>
                  </div>
                  <div className="col-4">
                    <h3 className="text-white text-left">
                      {lecture.course.name}
                    </h3>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Base>
  );
};

export default Lecture;
