import React from 'react';
import { useSelector } from 'react-redux';

function SpanResultCountry() {
  const { choiceCountry } = useSelector(({ form }) => form);

  return (
    <span data-result-country={choiceCountry} className="chCon">{choiceCountry}</span>
  );
}

export default React.memo(SpanResultCountry);
