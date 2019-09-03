import React from 'react';
import PropTypes from 'prop-types';
import './Artist.css';


const Artist = ({data}) => {
  return (
    <div className="mArtist">
      <ul className="mArtist__list">
        {
          data.map(item => (
            <li className=""  key={item.name}>
            <a href="xxx" className="artistInfo">
              <div className="artistInfo__image" style={{ backgroundImage: `url(${item.image})`}}></div>
            </a>
            <div>
              <dl className="artistInfo__name">{item.name}</dl>
              <dd className="artistInfo__job">{item.job}</dd>
            </div>
          </li>
          ))
        }
      </ul>
    </div>
  );
};

Artist.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Artist;
