import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="black"
      d="M6.56772 0.031239C6.95188 0.0899248 7.33812 0.141119 7.70855 0.264317C9.99397 1.02432 11.3979 2.58719 11.8956 4.93754C12.1703 6.23445 11.9439 7.49849 11.4927 8.72673C10.9359 10.243 10.0876 11.5936 9.10536 12.8651C8.29125 13.919 7.39806 14.9012 6.42079 15.8065C6.14318 16.0641 5.87056 16.0654 5.59378 15.8057C4.03424 14.3414 2.65325 12.7294 1.5582 10.8848C0.894755 9.76726 0.356178 8.59396 0.128926 7.30328C-0.261064 5.08571 0.320383 3.16489 1.9615 1.60577C2.90797 0.705918 4.05422 0.198556 5.35571 0.0516333C5.38609 0.0483036 5.41606 0.0378983 5.44603 0.0308228C5.81978 0.0308228 6.19354 0.0308228 6.56772 0.0308228V0.031239ZM6.01291 9.31192C7.84382 9.30984 9.30556 7.84602 9.30597 6.01469C9.30597 4.17587 7.84049 2.71164 6.00125 2.71414C4.17034 2.71622 2.70902 4.1792 2.70819 6.01095C2.70736 7.84935 4.17409 9.31442 6.01291 9.31192Z"
          />
  </Svg>
)
export { SvgComponent as InstallBase }
