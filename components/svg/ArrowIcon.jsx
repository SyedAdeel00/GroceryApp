import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ArrowIcon = (props) => (
  <Svg
    width={9}
    height={5}
    viewBox="0 0 9 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1 0.757L4.471 4.243L7.942 0.757"
      stroke="#B2BBCE"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ArrowIcon;
