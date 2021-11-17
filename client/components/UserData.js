import React from "react";
import { connect } from "react-redux";
import { fetchUsers, deleteUser } from "../store/users";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import { ListItem } from "@mui/material";
import { ListItemText } from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { IconButton } from "@mui/material"
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export class UserData extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }


  render() {
    const { allUsers } = this.props;

    const columns = [
      { field: 'col1', headerName: 'ID', width: 50 },
      { field: 'col2', headerName: 'First Name', width: 150 },
      { field: 'col3', headerName: 'Last Name', width: 150 },
      { field: 'col4', headerName: 'Email', width: 200 },
      { field: 'col5', headerName: 'Admin Status', width: 150 },

      { field: 'col6', headerName: '', width: 100, renderCell: (userId) => {return <Button variant="outlined" size="small" onClick={() => {
        alert("Edit user " + userId.value);
      }}>Edit</Button>}},

      { field: 'col7', headerName: '', width: 80, renderCell: (userId) => {return <IconButton aria-label="delete" onClick={() => {
        this.props.deleteUser(userId.value);
        // alert("Delete user " + userId.value);
      }}><DeleteIcon /></IconButton>}}

    ];


    const rows = allUsers.map((user) => ({
      id: user.id,
      col1: user.id,
      col2: user.first_name,
      col3: user.last_name,
      col4: user.email_address,
      col5: user.is_admin? "Admin":"Not Admin",
      col6: user.id,
      col7: user.id
    }));


    return (
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid rows={rows} columns={columns}/>
      </div>

    );
  }
}

const mapState = (state) => ({
  allUsers: state.users.allUsers,
});

const mapDispatch = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  deleteUser: (id) => dispatch(deleteUser(id, history))
});

export default connect(mapState, mapDispatch)(UserData);
