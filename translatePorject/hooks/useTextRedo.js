import { useState, useCallback } from 'react';

export default (init = null) => {
  const [value, setValue] = useState(init);
  const handler = useCallback((e) => {
    setValue('');
  }, []);

  return [value, handler, setValue];
};
