import React from 'react';
import PropTypes from 'prop-types';
import './LineLink.css';

const LineLink = ({herf, title, extra}) => {
  return (
    <a href={herf} className="lineLink" >
      <div className="lineLink__title">{title}</div>
      <div className="lineLink__extra">{extra}</div>
      <i className="lineLink__arrow"/>
    </a>
  );
};

LineLink.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  extra: PropTypes.string
};

export default LineLink;
