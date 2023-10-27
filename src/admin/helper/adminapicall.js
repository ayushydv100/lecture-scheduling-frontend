import { API } from "../../backend";

//Instructer calls

//remove

//create Instructer

export const createInstructer = (userId, token, instructer) => {
  return fetch(`${API}instructer/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(instructer),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Get all Instructers

export const getInstructers = () => {
  return fetch(`${API}instructers`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// Course calls

export const createCourse = (userId, token, course) => {
  return fetch(`${API}course/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: course,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const createLecture = (userId, token, lecture) => {
  return fetch(`${API}lecture/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: lecture,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//get all Courses

export const getCourses = () => {
  return fetch(`${API}courses`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getLectures = () => {
  return fetch(`${API}lectures`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//delete

export const deleteCourse = (courseId, userId, token) => {
  return fetch(`${API}Course/${courseId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteLecture = (lectureId, userId, token) => {
  return fetch(`${API}Course/${lectureId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//get a Course

export const getCourse = (courseId) => {
  return fetch(`${API}course/${courseId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//update

export const updateCourse = (courseId, userId, token, course) => {
  return fetch(`${API}course/${courseId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: course,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
