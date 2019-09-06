import React, {Component} from 'react';
import { Provider } from 'react-redux';
import store from "../../store";
import MovieInfo from './components/MovieInfo';
import SeatSelected from './components/SeatSelected';
import SeatSelector from './container/SeatSelector';
import './index.css';


class Seat extends Component {

  // addSeat = (seat) => {
  //   this.setState((preState) => ({
  //     selectSeat: [...preState.selectSeat, seat]
  //   }));
  // }
  //
  // removeSeat = (id) => {
  //   this.setState({
  //     selectSeat: this.state.selectSeat.filter(seat => seat.id !== id)
  //   });
  // }



  render() {
    return (
      <Provider store={store}>
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
              <div className="seat__map"><SeatSelector /></div>
            </div>
          </div>
          <SeatSelected />
        </div>
      </Provider>
    );
  }
}

export default Seat;
