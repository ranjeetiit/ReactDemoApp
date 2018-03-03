import React from 'react';
import PropTypes from 'prop-types';

const FilmTitlePop = (props) => {
	return (
		<div className="people-film-title">
			<h4>
				Films
				<span 
					className="close-btn" 
					title="close"
					onClick = {props.closeFilmTitlePop}
				>
					x
				</span>
			</h4>
			{
				!props.isLoaded ?
					<p>Loading...</p> : 
					<div>
						{props.title.reduce((prev,curr,idx)=>{
							return `${prev}${idx > 0 ? ', ' : ''}${curr}`;
						} , "")}
					</div> 
			}
		</div>
	)
}


FilmTitlePop.propTypes = {
	isLoaded : PropTypes.bool,
	title : PropTypes.array,
	closeFilmTitlePop :PropTypes.func
};

FilmTitlePop.defaultProps = {
  	isLoaded : false,
	title : [],
	closeFilmTitlePop :() => {}
};

export default FilmTitlePop;