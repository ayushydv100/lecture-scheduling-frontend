import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddInstructer from "./admin/AddInstructer";
import AddCourse from "./admin/AddCourse";
import AddLecture from "./admin/AddLecture";
import Lecture from "./core/Lecture";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/lectures/:course" exact component={Lecture} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoute
          path="/admin/create/instructer"
          exact
          component={AddInstructer}
        />

        <AdminRoute path="/admin/create/course" exact component={AddCourse} />
        <AdminRoute path="/admin/create/lecture" exact component={AddLecture} />
        {/* <AdminRoute path="/admin/courses" exact component={Managecourses} /> */}
        {/* <AdminRoute
          path="/admin/course/update/:courseId"
          exact
          component={Updatecourse}
        /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
