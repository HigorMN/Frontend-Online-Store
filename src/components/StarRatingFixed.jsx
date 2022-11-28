import React from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';

const FIVE = 5;

const colors = {
  orange: '#FFBA5A',
  grey: '#a9a9a9',
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
  },
};

export default function StarRatingsFixed(props) {
  const { rating } = props;
  const stars = Array(FIVE).fill(0);

  return (
    <div style={ styles.container }>
      <div styles={ styles.stars }>
        {stars.map((_, index) => (
          <FaStar
            key={ index }
            size={ 24 }
            color={ rating > index ? colors.orange : colors.grey }
            style={ { marginRight: 5 } }
          />
        ))}
      </div>
    </div>
  );
}

StarRatingsFixed.propTypes = {
  rating: PropTypes.number.isRequired,
};
