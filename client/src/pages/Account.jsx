import React from "react";
import { Link, Outlet } from "react-router-dom";

function Account(props) {
  return (
    <div>
      <h1 className="text-center">Account</h1>

      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-6 md-5 lg-6">
            <div className="card border-0 text-center d-flex d-column">
              <div className="card-title text-center p-1 d-flex flex-row align-items-center justify-content-center">
                <Link
                  className="text-secondary text-decoration-none"
                  to="/account/login"
                >
                  Login
                </Link>
                <div className="mx-3">
                  <span>|</span>
                </div>
                <Link
                  className="text-secondary  text-decoration-none"
                  to="/account/register"
                >
                  Register
                </Link>
              </div>
              <div className="card-body border-0">{<Outlet />}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
