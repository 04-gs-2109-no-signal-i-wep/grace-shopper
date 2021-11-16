import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/users";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

export class UserData extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    const { allUsers } = this.props;
    return (
      <Container maxWidth="md" className="user-container">
          <Grid container spacing={2} justifyContent="center" alignItems="center" direction="row">
            {allUsers &&
              allUsers.map((user) => {
                return (
                  <Grid item xs={8} md={4} key={user.id}>
                    {user.id}
                    {user.first_name}
                    {user.is_admin ? "ADMIN" : "not admin"}

                  </Grid>
                );
              })}
          </Grid>
      </Container>
    );
  }
}

const mapState = (state) => ({
  allUsers: state.users.allUsers,
});

const mapDispatch = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
});

export default connect(mapState, mapDispatch)(UserData);
