import React, { useState } from 'react';
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

export default function StarRatings() {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(FIVE).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  return (
    <div style={ styles.container }>
      <div styles={ styles.stars }>
        {stars.map((_, index) => (
          <FaStar
            key={ index }
            size={ 24 }
            onClick={ () => handleClick(index + 1) }
            onMouseOver={ () => handleMouseOver(index + 1) }
            onMouseLeave={ handleMouseLeave }
            color={ (hoverValue || currentValue) > index ? colors.orange : colors.grey }
            style={ {
              marginRight: 5,
              cursor: 'pointer',
            } }
          />
        ))}
      </div>
    </div>
  );
}
