import {useState, useEffect, useRef} from "react";

const ChangingProgressProvider = ({values, interval = 1000, children}) => {
  const [valuesIndex, setValuesIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setValuesIndex(prevIndex => (prevIndex + 1) % values.length);
    }, interval);

    return () => clearInterval(intervalRef.current);
  }, [values, interval]);

  return children(values[valuesIndex]);
};

export default ChangingProgressProvider;
