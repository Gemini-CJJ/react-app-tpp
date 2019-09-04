import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { data } from '../mock/seat.json';

const SEAT_WIDTH = 50;
const SEAT_HEIGHT = 50;
const ratio = window.devicePixelRatio;
const DRAW_SEAT_WIDTH = SEAT_WIDTH * ratio;
const DRAW_SEAT_HEIGHT = SEAT_HEIGHT * ratio;
const lastSeat = data[data.length - 1];
const CANVAS_WIDTH = lastSeat.colIndex * SEAT_WIDTH;
const CANVAS_HEIGHT = lastSeat.rowIndex * SEAT_HEIGHT;
const DRAW_CANVAS_WIDTH = CANVAS_WIDTH * ratio;
const DRAW_CANVAS_HEIGHT = CANVAS_HEIGHT * ratio;




class SeatSelector extends Component {
  componentDidMount() {
    this.ctx = this.refs.canvas.getContext('2d');
    this.ctx.font = `${10 * ratio}px Arial`;
    this.ctx.fillStyle = '#fff';
    this.ctx.textAlign = 'center';
    // 加载需要的图片资源
    const emptyImage = new Image();
    const selectImage = new Image();
    const soldImage = new Image();
    let count = 0;

    const loadCallback = () => {
      count++;
      if (count === 3) {
        this.emptyImage = emptyImage;
        this.selectImage = selectImage;
        this.soldImage = soldImage;
        this.drawAllSeat();
      }
    };

    emptyImage.onload = loadCallback;
    selectImage.onload = loadCallback;
    soldImage.onload = loadCallback;

    emptyImage.src = './source/seat-empty.png';
    selectImage.src = './source/seat-selected.png';
    soldImage.src = './source/seat-sold.png';

  }

  componentDidUpdate(prevProps, prevState) {
    this.ctx.clearRect(0, 0, DRAW_CANVAS_WIDTH, DRAW_CANVAS_HEIGHT);
    this.drawAllSeat(); // 画初始座位
    this.drawSelectSeat(); // 画已选择的座位
  }

  drawAllSeat = () => {
    const seatData = data;

    for (let i = 0; i < seatData.length; i ++) {
      const { isSold, xPos, yPos } = seatData[i];
      const offsetLeft = (xPos - 1) * DRAW_SEAT_WIDTH;
      const offsetTop = (yPos - 1) * DRAW_SEAT_HEIGHT;

      if (isSold) {
        this.ctx.drawImage(this.soldImage, offsetLeft, offsetTop, DRAW_SEAT_WIDTH, DRAW_SEAT_HEIGHT);
      } else {
        this.ctx.drawImage(this.emptyImage, offsetLeft, offsetTop, DRAW_SEAT_WIDTH, DRAW_SEAT_HEIGHT);
      }
    }
  }

  drawSelectSeat = () => {
    const { selectSeat } = this.props;

    for (let i = 0; i < selectSeat.length; i++) {
      const { xPos, yPos, rowIndex, colIndex } = selectSeat[i];
      const offsetLeft = (xPos - 1) * DRAW_SEAT_WIDTH;
      const offsetTop = (yPos - 1) * DRAW_SEAT_HEIGHT;
      this.ctx.drawImage(this.selectImage, offsetLeft, offsetTop, DRAW_SEAT_WIDTH, DRAW_SEAT_HEIGHT);
      this.ctx.fillText(`${rowIndex}排`, offsetLeft + DRAW_SEAT_WIDTH / 2, offsetTop + DRAW_SEAT_HEIGHT / 2.5);
      this.ctx.fillText(`${colIndex}座`, offsetLeft + DRAW_SEAT_WIDTH / 2, offsetTop + DRAW_SEAT_HEIGHT * 2 / 3);
    }
  }

  clickSeat = (e) => {
    const offset = this.refs.canvas.getBoundingClientRect();
    const clickX = e.pageX - offset.left;
    const clickY = e.pageY - offset.top;
    const xPox = Math.ceil(clickX / SEAT_WIDTH);
    const yPox = Math.ceil(clickY / SEAT_HEIGHT);

    const seat = data.find(seat => seat.xPos === xPox && seat.yPos === yPox);

    // 如果未找到或者当前座位已售，则不响应
    if(!seat || seat.isSold) {
      return;
    }

    const seatIndex = this.props.selectSeat.findIndex(item => item.id === seat.id);

    if (seatIndex > -1) {
      // 如果已经选择了，需要取消选择，反之选择座位
      this.props.onRemove(seat.id);
    } else {
      if (this.props.selectSeat.length >= 4) {
        // 如果已经选择了四个座位，则不能再选
        alert('不能超过四个座位');
      } else {
        this.props.onAdd(seat);
      }
    }
  }

  render() {
    return (
      <canvas onClick={this.clickSeat} style={{width: CANVAS_WIDTH, height: CANVAS_HEIGHT}} ref="canvas" width={DRAW_CANVAS_WIDTH} height={DRAW_CANVAS_HEIGHT}/>
    );
  }
}

SeatSelector.propTypes = {
  selectSeat: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired
};

export default SeatSelector;
