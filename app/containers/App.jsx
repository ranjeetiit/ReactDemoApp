import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import PeopleCard from 'Containers/PeopleCard';
import Loader from 'Components/Loader';
import ZeroResult from 'Components/ZeroResult';
import InputFilter from 'Components/InputFilter';



class App extends Component{
	state = {
		peopleData : [],
		isFirstDataLoaded : false,
		nameFilterVal : "",
		genderFilterVal : ""
	}

	constructor(props){
		super(props);
	}


	filterByName = (event)=> {
		this.setState({
			nameFilterVal : event.target.value
		})
	}

	filterByGender =  (event)=> {
		this.setState({
			genderFilterVal : event.target.value
		})
	}

	renderResult(){
		if(!this.state.isFirstDataLoaded){
			return <Loader />;
		}
		let peopleData = this.state.peopleData.slice();
		if(this.state.nameFilterVal){
			peopleData = peopleData.filter((ele)=>{
				return ele.name.toLowerCase().includes(this.state.nameFilterVal.toLowerCase());
			})
		}

		if(this.state.genderFilterVal){
			peopleData = peopleData.filter((ele)=>{
				return ele.gender.toLowerCase() == this.state.genderFilterVal;
			})
		}
		
		return (
			<div>
				<InputFilter
					namefiletrValue = {this.state.nameFilterVal}
					filterByName = {this.filterByName} 
					genderFilterVal = {this.state.genderFilterVal}
					filterByGender = {this.filterByGender}
				/>
				{
					peopleData.length > 0 ? 
						<div className="people-grid">
							{
								peopleData.map((item,idx) =>{
									return (
										<PeopleCard 
											peopleObj = {item}
											key = {item.url}
										/>
									)
								})
							}
						</div> :
						<ZeroResult />
				}
				
			</div>
		)	
	}
	getPeopleData(){
		axios.get("https://swapi.co/api/people")
			.then((response)=>{
				this.setState({
			  		peopleData : response.data.results,
			  		isFirstDataLoaded : true
				})
			}).
			catch((err)=>{
				console.log(err)
			})
	}

	componentDidMount(){
		this.getPeopleData();
	}

	render(){
		return (
			<div className="main-container">
				<h1 className="app-title">Demo App</h1>
			{
				this.renderResult()
			}
			</div>
		)
	}
}

App.propTypes = {
  
};

App.defaultProps = {
  
};

export default App;