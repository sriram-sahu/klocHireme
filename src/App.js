import React, { useState } from "react";
import TestContext from "./TestContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/Admin/AdminLogin";
import TestReports from "./components/Admin/TestReports";
import SendAssessments from "./components/Admin/SendAssessments";

import Dashboard from "./components/Admin/Dashboard";
import StudentLogin from "./components/Student/StudentLogin";

import ShopifyTest from "./components/Student/StudentTests/ShopifyTest";
import FresherTests from "./components/Student/StudentTests/FresherTests";
import FullStackTest from "./components/Student/StudentTests/FullStackTest";
import PythonTest from "./components/Student/StudentTests/PythonTest";
import JavaTest from "./components/Student/StudentTests/JavaTest";
import FrontEndFresherTest from "./components/Student/StudentTests/FrontEndFresherTest";
import MernDeveloperJunior from "./components/Student/StudentTests/MernDeveloperJunior";
import MernDeveloperIntermediate from "./components/Student/StudentTests/MernDeveloperIntermediate";
import FresherQATest from "./components/Student/StudentTests/FresherQATest";
import Assessment from "./components/Admin/Assessment";
import NotFound from "./components/Admin/NotFound";
import FreshersJuniorTest from "./components/Student/StudentTests/FreshersJuniorTest";

const App = () => {
  const [reports, setReports] = useState([]);

  const addToReports = (item) => {
    setReports(item);
  };

  return (
    <TestContext.Provider value={{ reports, addToReports }}>
      <BrowserRouter>
        <Routes>
          {/* admin components */}
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/testReports" element={<TestReports />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sendAssessments" element={<Assessment />} />

          {/* student components */}
          <Route path="/studentLogin" element={<StudentLogin />} />

          {/* test navigation */}
          <Route path="/fresher-junior-test" element={<FreshersJuniorTest />} />
          <Route path="/fresher-test" element={<FresherTests />} />
          <Route path="/fresher-qa-test" element={<FresherQATest />} />
          <Route path="/fullstack-developer-test" element={<FullStackTest />} />
          <Route path="/fresher-python-test" element={<PythonTest />} />
          <Route path="/fresher-java-test" element={<JavaTest />} />
          <Route
            path="/frontend-fresher-test"
            element={<FrontEndFresherTest />}
          />
          <Route path="/shopify-developer-test" element={<ShopifyTest />} />
          <Route
            path="/mern-developer-junior-test"
            element={<MernDeveloperJunior />}
          />
          <Route
            path="/mern-developer-intermediate-test"
            element={<MernDeveloperIntermediate />}
          />
          <Route path="/notFound" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TestContext.Provider>
  );
};

export default App;
