import React, {Component} from 'react';
import './index.css';
import MovieInfo from './components/MovieInfo';
import SeatSelected from './components/SeatSelected';
import SeatSelector from './container/SeatSelector';
import './index.css';

class Seat extends Component {

  state = {
    selectSeat: []
  }

  addSeat = (seat) => {
    this.setState((preState) => ({
      selectSeat: [...preState.selectSeat, seat]
    }));
  }

  removeSeat = (id) => {
    this.setState({
      selectSeat: this.state.selectSeat.filter(seat => seat.id !== id)
    });
  }



  render() {
    return (
      <div className="seat">
        <div className="tOperator">
          <i className="tOperator__icon tOperator__icon--blackBack"  onClick={() => { window.history.back(); }} />
          万达影院
          <i className="tOperator__icon tOperator__icon--blackShare" />
        </div>
        <MovieInfo />
        <div className="seat__main">
          <div className="seat__tip"></div>
          <div className="seat__graph">
            <div className="seat__screen">B13屏幕</div>
            <div className="seat__map"><SeatSelector selectSeat={this.state.selectSeat}  onAdd={this.addSeat} onRemove={this.removeSeat}/></div>
          </div>
        </div>
        <SeatSelected data={this.state.selectSeat} onRemove={this.removeSeat} />
      </div>
    );
  }
}

export default Seat;
