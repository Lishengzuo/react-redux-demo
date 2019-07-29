import React, { Component } from 'react';
import { connect } from 'react-redux';

class Counter extends Component {
	render() {
		const { dispatch } = this.props;
		return (
			<div>
				<p>次数：{ this.props.counter }</p>
				<button onClick={ () => dispatch({ type: "add" }) } >加一</button>
				<button onClick={ () => dispatch({ type: "sub" }) } >减一</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return ({
		counter: state
	});
}

export default connect( mapStateToProps )(Counter);