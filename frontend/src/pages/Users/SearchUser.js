import React, { useState } from "react";
import { connect } from "react-redux";
import { searchByUsername } from "../../actions/users.action";
import { getUsers } from "../../actions/users.action";


const SearchUser = ({searchByUsername}) => {
  let [userNameFromSearch, setuserNameFromSearch] = useState("");

  const onChange = (e) => setuserNameFromSearch(e.target.value);


  const searchForUser = () => {
    if (userNameFromSearch === "" || userNameFromSearch === null) {
      getUsers();
    }else {
     searchByUsername(userNameFromSearch);

  }};
  return (
    <header className="users-header">
      
      <p className="app_color_font font__bold font__p users-headline">Users</p>
      <br />


      <form className="search-user-wrapper">
        <textarea
          type="text"
          placeholder="Type the username..."
          value={userNameFromSearch}
          onChange={(e) => onChange(e)}
        />

        <div
          onClick={() => searchForUser()}
          className="user-search-button app_color_background font__p font__bold"
        >Search for user
        </div>
      </form>
    </header>
  );
};



export default connect(null, { searchByUsername, getUsers })(SearchUser);
