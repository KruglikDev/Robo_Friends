import React, { useEffect } from 'react';
import {connect} from "react-redux";
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
// import Scroll from '../components/Scroll';
import Header from "../components/Header";
import './App.css';

import { setSearchField, requestRobots} from "../actions";

const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

const App = (props) => {

  useEffect(() =>  {
    props.onRequestRobots()
  }, [])
  
    const filteredRobots = props.robots.filter(robot => {
      return robot.name.toLowerCase().includes(props.searchField.toLowerCase());
    })
    
    return props.isPending ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <Header />
          <SearchBox searchChange={props.onSearchChange}/>
          {/* <Scroll> */}
            <CardList robots={filteredRobots} />
          {/* </Scroll> */}
        </div>
      );
  }


export default connect(mapStateToProps, mapDispatchToProps)(App);