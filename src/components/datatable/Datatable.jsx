import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource.js";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Datatable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(userRows);

  const handleView = (username, email, role) => {
    console.log(username);
    localStorage.setItem("tuser", username);
    localStorage.setItem("temail", email);
    localStorage.setItem("trole", role);
    navigate("/users/test")
    // axios
    // .get("http://localhost:8081/api/users/"+id)
    // .then((res) => {
    //   console.log(res);
    //   // if(res.status === 200){
    //       // localStorage.removeItem("islogged");
    //       navigate("/users/test")
    //   // }else{
    //       // navigate("/dashboard")
    //   // }
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="" style={{ textDecoration: "none" }}> */}
              <div className="viewButton" onClick={() => handleView(params.row.username, params.row.email, params.row.role)}>View</div>
            {/* </Link> */}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;