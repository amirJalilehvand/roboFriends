import React, { Component} from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
//import {robots} from '../components/robots';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '..//components/ErrorBoundry';
import {setSearchField} from '../action';
import './App.css';

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {onSearchChange : (event) => dispatch(setSearchField(event.target.value))}

}


class App extends Component {
    constructor(){
        super();
        this.state = {
            robots: []
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(Response => Response.json() )
        .then(users=> this.setState({robots: users}));
    }

    render(){
        const {robots} = this.state;
        const {searchField , onSearchChange} = this.props;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });
        if(!robots.length){
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        }else{
        return(
            <div className="tc">
                <h1 className="f1">RoboFriends</h1>
                <SearchBox searchChange = {onSearchChange} />
                <Scroll>
                <ErrorBoundry>
                <CardList robots={filteredRobots} />
                </ErrorBoundry>
                </Scroll>
            </div>
        );
        }
    }
}

export default connect(mapStateToProps , mapDispatchToProps) (App);