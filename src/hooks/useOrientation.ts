import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

type Orientation = 'portrait' | 'landscape';

export const useOrientation = (): Orientation => {
  const [orientation, setOrientation] = useState<Orientation>(getOrientation());

  function getOrientation(): Orientation {
    const {width, height} = Dimensions.get('window');
    return width < height ? 'portrait' : 'landscape';
  }

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      setOrientation(getOrientation());
    });

    return () => subscription.remove();
  }, []);

  return orientation;
};
