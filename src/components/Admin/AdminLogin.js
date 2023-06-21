import React, { useEffect, useState } from "react";
import TestContext from "../../TestContext";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./index.css";

const AdminLogin = () => {
  const [sheetData, setSheetData] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [filteredData, setFilteredData] = useState(sheetData);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { addToReports, reports } = React.useContext(TestContext);

  const navigate = useNavigate();

  useEffect(() => {
    const loadGoogleAPI = () => {
      const script = document.createElement("script");
      script.src = process.env.REACT_APP_SCRIPT_SRC;
      script.onload = initializeGoogleAPI;
      document.head.appendChild(script);
    };

    const initializeGoogleAPI = () => {
      window.gapi.load("client:auth2", initClient);
    };

    const initClient = () => {
      window.gapi.client
        .init({
          apiKey: process.env.REACT_APP_API_KEY,
          clientId: process.env.REACT_APP_CLIENT_ID,
          scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
          discoveryDocs: [
            "https://sheets.googleapis.com/$discovery/rest?version=v4",
          ],
        })
        .then(() => {
          console.log("Google API client initialized");
          const authInstance = window.gapi.auth2.getAuthInstance();
          setIsSignedIn(authInstance.isSignedIn.get());
          authInstance.isSignedIn.listen(updateSignInStatus);
          executeRequest();
          getUserEmail();
        })
        .catch((error) => {
          console.error("Error initializing Google API client", error);
        });
    };

    const updateSignInStatus = (isUserSignedIn) => {
      setIsSignedIn(isUserSignedIn);
      if (isUserSignedIn) {
        getUserEmail();
      } else {
        setUserEmail("");
      }
    };

    const executeRequest = () => {
      if (isSignedIn) return; // Don't execute if user is not signed in
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: process.env.REACT_APP_SHEET_ID,
          range: process.env.REACT_APP_SHEET_NAME,
        })
        .then((response) => {
          const values = response.result.values || [];
          console.log(values);
          const headers = values[0];
          const jsonData = values.slice(1).map((row) => {
            const item = {};
            row.forEach((value, index) => {
              item[headers[index]] = value;
            });
            return item;
          });
          console.log(jsonData, "json");
          setSheetData(jsonData);
          setFilteredData(jsonData);
          addToReports(jsonData);
        })
        .catch((error) => {
          console.error("Error executing request", error);
        });
    };

    const getUserEmail = () => {
      const authInstance = window.gapi.auth2.getAuthInstance();
      if (authInstance.isSignedIn.get()) {
        const currentUser = authInstance.currentUser.get();
        const basicProfile = currentUser.getBasicProfile();
        const email = basicProfile.getEmail();
        if (email === "klocprojectone@gmail.com") {
          const loginId = uuidv4();
          Cookies.set("token", loginId, { expires: 30 });
        } else {
          navigate("/notFound");
        }
        setUserEmail(email);
      }
    };

    loadGoogleAPI();
  }, [reports]);

  const handleSignIn = () => {
    const authInstance = window.gapi.auth2.getAuthInstance();
    authInstance.signIn().catch((error) => {
      if (error.error === "popup_closed_by_user") {
        console.error("Popup Closed By the User", error);
      } else {
        console.error("Error signing in with Google", error);
        // Handle other sign-in errors
      }
    });
  };

  const handleFilter = () => {
    const filtered = sheetData.filter((item) => {
      const itemDate = new Date(item.Timestamp);
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1); // Added one day to the end date
      return itemDate >= start && itemDate <= end;
    });
    setFilteredData(filtered);
  };

  const handleSignOut = () => {
    Cookies.remove("token");
    const authInstance = window.gapi.auth2.getAuthInstance();
    authInstance.signOut();
  };

  return (
    <div>
      <div>
        <p>
          {isSignedIn ? (
            <>
              {navigate("/dashboard", { state: sheetData })}
              <span className='display-between'>
                Email : {userEmail}{" "}
                <button onClick={handleSignOut}>Sign Out</button>
              </span>
            </>
          ) : (
            <div className='display-column'>
              <h2>Login With Google</h2>
              <button onClick={handleSignIn} className='google-signin-button'>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                  alt='Google Logo'
                />
                Sign In with Google
              </button>
            </div>
          )}
        </p>
      </div>
      {isSignedIn && sheetData.length > 0 && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "20px",
            }}
          ></div>
          <div className='display-center'>
            <div className='display-between'>
              Start Date:{" "}
              <input
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            {"    "}
            <div>
              End Date:{" "}
              <input
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <button onClick={handleFilter}>Filter</button>
          </div>
          <div>
            {Array.isArray(sheetData) && filteredData.length > 0 ? (
              <div></div>
            ) : (
              <div>No data available</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
