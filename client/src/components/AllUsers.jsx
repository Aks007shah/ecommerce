import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

function AllUsers(props) {
  const { getUser, userData, msg, setMsg } = useContext(AuthContext);

  useEffect(() => {
    if (userData) {
      getUser();
    }
  });

  const toggleAdmin = async (id, currentStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:5100/auth/toggleadmin/${id}`,
        {
          isAdmin: !currentStatus, // flip status
        }
      );

      if (response.status === 200) {
        Swal.fire({
          title: response.data.message,
          icon: "success",
        });
        getUser(); // refresh user list
      }
      setMsg(response.data.message);
    } catch (error) {
      Swal.fire({
        title: "Server Error",
        icon: "error",
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-10">
        <div>
          {msg}
        </div>
          <table className="table table-primary">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>isAdmin</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.isAdmin ? <td>True</td> : <td>False</td>}</td>
                  <td>
                    <button
                      className={`btn ${
                        item.isAdmin ? "btn-secondary" : "btn-warning"
                      }`}
                      onClick={() => toggleAdmin(item._id, item.isAdmin)}
                    >
                      {item.isAdmin ? "Remove Admin" : "Make Admin"}
                    </button>
                  </td>

                  <td>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllUsers;
