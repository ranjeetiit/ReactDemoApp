import React, {Component} from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import FilmTitlePop from 'Components/FilmTitlePop';

class PeopleCard extends Component{
	state = {
		isFimTitleLoaded : false,
		filmTitle : [],
		isFilmPopVisible :false,
		isGetBtnClicked : false
	}

	constructor(props){
		super(props)
	}
	
	getFilmTitle = ()=> {
		this.setState({
			isFilmPopVisible : true
		});

		if(this.state.isGetBtnClicked){
			return;
		}

		this.setState({
			isGetBtnClicked : true
		})

		let promises = [];

		for (let i = 0 , len = this.props.peopleObj.films.length; i < len; i++) {
		    promises.push(axios.get(this.props.peopleObj.films[i]));
		}

		axios.all(promises)
			.then(axios.spread((...args)=> {
			  	let filmTitle = [];
	    		for (let i = 0; i < args.length; i++) {
	        		filmTitle.push(args[i].data.title);
	        	}
		        this.setState({
		        	filmTitle : filmTitle,
		        	isFimTitleLoaded : true
		        })
		  	}))
			.catch((err)=>{
				this.setState({
					isGetBtnClicked : false
				})
				console.log('error in fetching film title');
			});
	}
	closeFilmTitlePop = ()=>{
		this.setState({
			isFilmPopVisible : false
		});
	}

	componentDidMount(){
		
	}

	render(){
		return(
			<div className="people-card">
				<div className ="people-detail people-card-name">
					{this.props.peopleObj.name}
				</div>
				<div className ="people-detail people-card-age">
					<span>Gender : </span> 
					<span>{this.props.peopleObj.gender}</span>
				</div>
				<div className ="people-detail people-card-birthyear">
					<span>Birth year : </span> 
					<span>{this.props.peopleObj.birth_year}</span>
				</div>
				<div className ="people-detail people-card-filmbtn">
					<button 
						onClick = {this.getFilmTitle} 
					>
						Get film detail
					</button>
				</div>
				{
					this.state.isFilmPopVisible ?
						<FilmTitlePop
							isLoaded = {this.state.isFimTitleLoaded}
							title ={this.state.filmTitle}
							closeFilmTitlePop = {this.closeFilmTitlePop}
						/>:
						null
				}
				
			</div>
		)
	}
}

PeopleCard.propTypes = {
	peopleObj : PropTypes.shape({})
};

PeopleCard.defaultProps = {
  peopleObj : {}
};


export default PeopleCard;
