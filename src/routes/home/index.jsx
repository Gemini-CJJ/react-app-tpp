import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import RenderToBody from '../../components/RenderToBody';
import TopBar from './components/TopBar';
import Slide from './components/Slide';
import MovieItem from './components/MovieItem';
import TabMenu from '../../components/TabMenu';
import CityLayer from './components/CityLayer';
import request from '../../helpers/request';

class Home extends Component {
  state = {
    city: '', // 当前城市
    poster: [], // slide 海报
    movie: [], // 当前热映电影
    cityLayerVisible: false // 城市浮层是否展现
  }


  showCityLayer = () => {
    this.setState({
      cityLayerVisible: true
    });
  }

  hideCityLayer = () => {
    this.setState({
      cityLayerVisible: false
    });
  }

  onChangeCity = (city) => {
    this.setState({
      city,
    });
    this.hideCityLayer();
  }

  componentWillMount() {
    this.getData();
  }

  getData = async () => {
    const data = await request('/index');
    const { city, poster, movie } = data;
    console.log(data);
    this.setState({
      city,
      poster,
      movie
    });
  }



  render () {
    const { city, poster, movie, cityLayerVisible } = this.state;

    return (
      <div className="home">
        <TopBar city={city} showCityLayer={this.showCityLayer} />
        <div className="home__slide">
          <div className="home__slideWrap">
            <Slide data={poster} />
          </div>
        </div>
        <ul className="home__content">
          {
            movie.map(item => (
              <li key={item.name}>
                <Link to="/detail">
                  <MovieItem data={item}/>
                </Link>
              </li>
            ))
          }
        </ul>
        <TabMenu current="movie"/>
        {cityLayerVisible && <RenderToBody><CityLayer onClose={this.hideCityLayer} onSelect={this.onChangeCity} /></RenderToBody>}
      </div>
    );
  }


}


export default Home;
