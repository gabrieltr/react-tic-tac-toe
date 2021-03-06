import React from 'react';

function Square(props){
  return (
    <button className={`square player${props.value}`} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square key={'square'.concat(i)}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />;
  }
     
  renderB(arrayIDs, handleRender) {
    return arrayIDs.map(
      (value,index,roArr) => handleRender(value, index, roArr)
    );
  }
   
  // renderColumns(rowidx, size) {
  //   let ret=[];
  //   for(let i=0; i<size; i++){
  //     ret = [...ret, this.renderSquare(i+(rowidx*size))];
  //   }
  //   return (ret);
  // }
  
  // renderBoard(size) {
  //   let ret=[];
  //   for(let i=0; i<size; i++){
  //     ret = [...ret, (<div className="board-row" key={'r'+i}>
  //          {this.renderColumns(i, size)}
  //        </div>)];
  //   }
  //   return ret;
  // }
   
  render() {
    const size = parseInt(this.props.boardSize || 3, 10);
    const arr = [...Array(size).fill(0)];
    return (
      <div className="board">
        {this.renderB(arr, ((value, rowidx) => (
          <div className="board-row" key={rowidx}>
            {this.renderB(arr, (value, colidx) => 
              this.renderSquare(colidx+(rowidx*size)))}
          </div>)))}
      </div>)
  }
}

export default Board;