import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const TrackIcon = ({height, width, color, props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M11 4.062A8.001 8.001 0 0 0 12 20a8.001 8.001 0 0 0 7.938-7H12a1 1 0 0 1-1-1V4.062Zm2 0V11h6.938A8.004 8.004 0 0 0 13 4.062ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default TrackIcon;
