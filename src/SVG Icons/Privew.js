import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const PreviewIcon = ({height, width, color, props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 17 17"
    {...props}>
    <Path
      d="M5 0v4h12V0H5zm11 3H6V1h10v2zM5 10h12V6H5v4zm1-3h10v2H6V7zm-1 9h12v-4H5v4zm1-3h10v2H6v-2zM0 4h4V0H0v4zm1-3h2v2H1V1zm-1 9h4V6H0v4zm1-3h2v2H1V7zm-1 9h4v-4H0v4zm1-3h2v2H1v-2z"
      fill={color}
    />
  </Svg>
);
export default PreviewIcon;
