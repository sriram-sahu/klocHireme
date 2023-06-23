import React, { useState } from "react";
import TestContext from "./TestContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/Admin/AdminLogin";
import TestReports from "./components/Admin/TestReports";
import SendAssessments from "./components/Admin/SendAssessments";
import Dashboard from "./components/Admin/Dashboard";
import StudentLogin from "./components/Student/StudentLogin";
import Home from "./components/Home/Home";
import FreshersJuniorTest from "./components/Student/StudentTests/FreshersJuniorTest";
import ShopifyTest from "./components/Student/StudentTests/ShopifyTest";
import FresherTests from "./components/Student/StudentTests/FresherTests";
import FullStackTest from "./components/Student/StudentTests/FullStackTest";
import PythonTest from "./components/Student/StudentTests/PythonTest";
import JavaTest from "./components/Student/StudentTests/JavaTest";
import FrontEndFresherTest from "./components/Student/StudentTests/FrontEndFresherTest";
import MernDeveloperJunior from "./components/Student/StudentTests/MernDeveloperJunior";
import MernDeveloperIntermediate from "./components/Student/StudentTests/MernDeveloperIntermediate";
import FresherQATest from "./components/Student/StudentTests/FresherQATest";
import ShopifyTabulation from "./components/Admin/Tests/ShopifyTabulation";
import FreshersTabulation from "./components/Admin/Tests/FreshersTabulation";
import FullStackTabulation from "./components/Admin/Tests/FullStackTabulation";
import PythonTabulation from "./components/Admin/Tests/PythonTabulation";
import JavaTabulation from "./components/Admin/Tests/JavaTabulation";
import FrontEndFresherTabulation from "./components/Admin/Tests/FrontEndFresherTabulation";
import MernDeveloperJuniorTabulation from "./components/Admin/Tests/MernDeveloperJuniorTabulation";
import MernDeveloperIntermediateTabulation from "./components/Admin/Tests/MernDeveloperIntermediateTabulation";
import QATabulation from "./components/Admin/Tests/QATabulation";
import FreshersJuniorTabulation from "./components/Admin/Tests/FreshersJuniorTabulation";
import NotFound from "./components/Admin/NotFound";
import StudentReports from "./components/Admin/StudentReports";
import Chart from "./components/Admin/Chart";

const App = () => {
  const [reports, setReports] = useState([]);

  const addToReports = (item) => {
    setReports(item);
  };

  return (
    <TestContext.Provider value={{ reports, addToReports }}>
      <BrowserRouter>
        <Routes>
          {/* Home component */}
          <Route path='/' element={<Home />} />
          {/* admin components */}
          <Route path='/adminLogin' element={<AdminLogin />} />
          <Route path='/testReports' element={<TestReports />} />
          <Route path='/studentReports' element={<StudentReports />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/sendAssessments' element={<SendAssessments />} />
          {/* student components */}
          <Route path='/studentLogin' element={<StudentLogin />} />

          {/* tabulation navigation */}
          <Route
            path='testReports/freshers_junior_test'
            element={<FreshersJuniorTabulation />}
          />
          <Route
            path='testReports/fresher_test'
            element={<FreshersTabulation />}
          />
          <Route
            path='testReports/fresher_qa_test'
            element={<QATabulation />}
          />
          <Route
            path='testReports/fullstack_developer_test'
            element={<FullStackTabulation />}
          />
          <Route
            path='testReports/fresher_python_test'
            element={<PythonTabulation />}
          />
          <Route
            path='testReports/fresher_java_test'
            element={<JavaTabulation />}
          />
          <Route
            path='testReports/frontend_fresher_test'
            element={<FrontEndFresherTabulation />}
          />
          <Route
            path='testReports/shopify_developer_test'
            element={<ShopifyTabulation />}
          />
          <Route
            path='testReports/mern_developer_junior'
            element={<MernDeveloperJuniorTabulation />}
          />
          <Route
            path='testReports/mern_developer_intermediate'
            element={<MernDeveloperIntermediateTabulation />}
          />
          <Route path='/notFound' element={<NotFound />} />
          {/* Chart */}
          <Route path='/studentChart' element={<Chart />} />

          {/* test navigation */}
          <Route
            path='/freshers-junior-test'
            element={<FreshersJuniorTest />}
          />
          <Route path='/fresher-test' element={<FresherTests />} />
          <Route path='/fresher-qa-test' element={<FresherQATest />} />
          <Route path='/fullstack-developer-test' element={<FullStackTest />} />
          <Route path='/fresher-python-test' element={<PythonTest />} />
          <Route path='/fresher-java-test' element={<JavaTest />} />
          <Route
            path='/frontend-fresher-test'
            element={<FrontEndFresherTest />}
          />
          <Route path='/shopify-developer-test' element={<ShopifyTest />} />
          <Route
            path='/mern-developer-junior-test'
            element={<MernDeveloperJunior />}
          />
          <Route
            path='/mern-developer-intermediate-test'
            element={<MernDeveloperIntermediate />}
          />
        </Routes>
      </BrowserRouter>
    </TestContext.Provider>
  );
};

export default App;
