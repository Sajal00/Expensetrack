import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const AddIcon = ({height, width, color, secondcolor, props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <Path
      fill={color}
      d="M11 8a1 1 0 1 1 2 0v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V8Z"
    />
    <Path
      fill={secondcolor}
      fillRule="evenodd"
      d="M23 12c0 6.075-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1s11 4.925 11 11ZM3.007 12a8.993 8.993 0 1 0 17.986 0 8.993 8.993 0 0 0-17.986 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default AddIcon;
