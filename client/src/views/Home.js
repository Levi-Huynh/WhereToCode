import React from 'react';
import { withAuthorization } from '../components/Session';
import NetworkSpeed from '../components/NetworkSpeed/NetworkSpeed'

import Map from "../components/Map/Map.jsx";

const Home = props => {
  console.log("props:", props);
  return (
    <div>
      <h1>Hello World</h1>
      <p>Home Page accessed by authorized user</p>
      <NetworkSpeed />
      <Map />
    </div>
  );
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);
