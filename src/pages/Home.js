import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

import AppsIcon from "@material-ui/icons/Apps";
import { Avatar } from "@material-ui/core";
import Search from "../components/Search";
function Home() {
  return (
    <div className="home">
      <div className="home__header">
        <div className="home__headerLeft">
          <Link to="/about">About</Link>
          <Link to="/store">Store</Link>
        </div>
        <div className="home__headerRight">
          <Link to="/images">Images</Link>
          <AppsIcon />
          <Avatar />
        </div>
      </div>
      <div className="home__body">
        <img src="https://i.imgur.com/Gojt15P.png" alt="" />

        <div className="home__inputContainer">
          <Search hideButtons={false} />
        </div>
      </div>
    </div>
  );
}

export default Home;