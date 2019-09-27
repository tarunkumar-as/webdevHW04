import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<Starter />, root);
}

class Starter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selected1: -1, selected2: -1};
    this.buttonPressed = this.buttonPressed.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.buttonArray = [];
    
    {/* Attribution: Ramdomizing logic https://javascript.info/task/shuffle*/}
    let array = ["A","B","C","D","E","F","G","H"];
    array = array.concat(array);
	array.sort(() => Math.random() - 0.5);
	this.buttonValues = array;
	this.matchedTiles = [];
	this.isButtonPressed = false;
	this.numberOfMoves = 0;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  buttonPressed(buttonValue) {
  	if (!this.matchedTiles.includes(buttonValue)) {
  		this.numberOfMoves += 1;
		if (this.state.selected1 == -1 || this.state.selected2 != -1) {
	  		let state1 = _.assign({}, this.state, { selected1: buttonValue , selected2: -1});
	  		this.setState(state1);
	  		this.isButtonPressed = true;
	  		clearInterval(this.interval);
    	}
    	else {
    		if (this.state.selected1 != buttonValue) {
    			this.isButtonPressed = false;
	  			let state1 = _.assign({}, this.state, { selected2: buttonValue });
	  			if (this.buttonValues[this.state.selected1] == this.buttonValues[buttonValue]) {
	    			this.matchedTiles.push(this.state.selected1);
	    			this.matchedTiles.push(buttonValue);
	    			this.setState(state1);
	  			}
	  			else {
	  				this.setState(state1);
	  				this.interval = setInterval(() => {
      					this.setState(prevState => ({
        					seconds: prevState.seconds + 1
      					}));
      					if (this.isButtonPressed == false) {
      						this.isButtonPressed = false;
							let state1 = _.assign({}, this.state, { selected1: -1, selected2: -1});
	      					clearInterval(this.interval);
	      					this.setState(state1);
      					}
      				}, 1000);
	  			}
    		}
    	}  	
  	}
  }
  
  resetGame() {
  	let state1 = _.assign({}, this.state, {selected1: -1, selected2: -1});
    this.buttonPressed = this.buttonPressed.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.buttonArray = [];
    
    let array = ["A","B","C","D","E","F","G","H"];
    array = array.concat(array);
	array.sort(() => Math.random() - 0.5);
	this.buttonValues = array;
	this.matchedTiles = [];
	this.numberOfMoves = 0;
	
	this.setState(state1);
  }
  
  render() {
    var i;
    this.buttonArray = []
	for (i = 0; i < 16; i++) {
	    let j = i;
	    var htmlText = "";
	    if (this.matchedTiles.includes(j)) {
			let button1 = <div className="column selected" onClick={() => this.buttonPressed(j)}>{this.buttonValues[j]}</div>;
			this.buttonArray.push(button1);	    	
	    }
	    else {
			if (this.state.selected1 == j || this.state.selected2 == j) {
	      		htmlText = this.buttonValues[j];
			}
			let button1 = <div className="column" onClick={() => this.buttonPressed(j)}>{htmlText}</div>;
			this.buttonArray.push(button1);	
	    }


	}
	
	let button = <div className="Reset"><p><button onClick={() => this.resetGame()}>Reset Game</button></p></div>;
	
    
    	if (this.matchedTiles.length == 16) {
    		return (
	    		<div className="container">
	    			<div className="header"><h3>Memory Game</h3></div>
	    			<div className="score"><h3>Points Scored: {this.numberOfMoves}</h3></div>
	   	 	 		<div className="reset">
	   	 	 			{button}
	   	 	 		</div>
    			</div>);
    	}
    	else {
    		return (
	    		<div className="container">
	    			<div className="header"><h3>Memory Game</h3></div>
	    			<div className="table">
	    	 		<div className="row">
	    				{this.buttonArray[0]}{this.buttonArray[1]}{this.buttonArray[2]}{this.buttonArray[3]}
	    	 		</div>
	    	 		<div className="row">
	   	 				{this.buttonArray[4]}{this.buttonArray[5]}{this.buttonArray[6]}{this.buttonArray[7]}
	   	 	 		</div>
	   	 	 		<div className="row">
	   	 				{this.buttonArray[8]}{this.buttonArray[9]}{this.buttonArray[10]}{this.buttonArray[11]}
	   	 	 		</div>
	   	 	 		<div className="row">
	   	 				{this.buttonArray[12]}{this.buttonArray[13]}{this.buttonArray[14]}{this.buttonArray[15]}
	   	 	 		</div>
	   	 	 		<div className="rowLast"></div>
	   	 			</div>
	   	 	 		<div className="reset">
	   	 	 			{button}
	   	 	 		</div>
    			</div>);
    	}
	}
}

