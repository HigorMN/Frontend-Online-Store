import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  const [evaluation, setEvaluation] = useState(0);

  const contextValue = useMemo(() => ({
    evaluation,
    setEvaluation,
  }), [evaluation]);

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
