import "../css/CalendarPage.css";
import "../../src/index.css";
import { authContext } from "../contexts/auth.context";
import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ConfirmedEvents from "../components/ConfirmedEvents";
import AvailableEvents from "../components/AvailableEvents";
import { Navigate, Link } from "react-router-dom";

export default function CalendarPage() {
  const { loading, isLoggedIn, user, getUserInfo, loadingPopulated } = useContext(authContext);
  const [loadingSpinner, setLoadingSpinner] = useState(true);

  useEffect(() => {
    getUserInfo();
    if (!loading)
      setTimeout(() => {
        setLoadingSpinner(false);
      }, 500);
  }, [loading]);

  if (!loading && !isLoggedIn) return <Navigate to="/signup" />;

  return (
    <div id="CalendarPage" className="anti-footer">
      {loadingSpinner ? (
        <div className="spinnerContainer">
          <span className="spinner" role="status"></span>
        </div>
      ) : (
        <>
          {!loading && isLoggedIn && (
            <div>
              <Navbar />
              <header className="tabs">
                <div></div>
                <Link className="tab active">Calendar</Link>
                <div></div>
                <Link to={user.username} className="tab inactive">Main Hub</Link>
                <div></div>
              </header>
              <div className="calendarComponents">
                <div className="row1">{!loadingPopulated && <ConfirmedEvents />}</div>
                <div className="row2">{!loadingPopulated && <AvailableEvents />}</div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}