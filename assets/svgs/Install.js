import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G fill="#000" clipPath="url(#a)">
      <Path d="M11.874 23.996c-3.88 0-7.76-.001-11.64.004-.16 0-.192-.03-.192-.191C.047 16.433.046 9.057.046 1.68c.128-.248.332-.394.589-.5A14.174 14.174 0 0 1 5.32.09a14.35 14.35 0 0 1 6.458 1.1c.403.171.58.44.58.88-.005 7.024-.005 14.048 0 21.072 0 .393-.132.677-.485.853ZM6.17 3.889c-.95 0-1.901-.003-2.851.001-.477.002-.734.26-.736.74a698.967 698.967 0 0 0 0 3.617c.002.486.266.745.757.746a3446 3446 0 0 0 5.68 0c.53 0 .783-.256.784-.79.002-1.176.002-2.35 0-3.525 0-.542-.244-.788-.781-.79H6.17Zm-.653 12.479h.584c.312.001.316.009.154.289-.303.525-.609 1.05-.91 1.576-.086.15-.157.306-.125.487.054.305.271.53.563.582.272.048.544-.088.715-.38.545-.934 1.088-1.87 1.625-2.809.336-.585.029-1.102-.653-1.109-.397-.003-.794 0-1.192 0-.324-.001-.333-.018-.174-.303.271-.49.552-.974.813-1.47.234-.445.01-.908-.47-1.01-.278-.058-.553.092-.737.42-.49.875-.978 1.752-1.463 2.63-.312.566-.011 1.08.638 1.096.21.006.42 0 .631.001ZM20.32 13.352c0-1.354 0-2.708.002-4.061 0-.16-.022-.27-.203-.34-1.308-.496-1.997-1.484-2.026-2.891a53.358 53.358 0 0 1 0-1.61c.005-.55.185-.77.724-.884.142-.03.194-.101.192-.241a23.84 23.84 0 0 1 0-.793c.008-.427.307-.728.718-.728s.71.299.718.726c.006.265.006.53.002.794-.003.158.068.228.224.227.265-.003.53-.002.794-.002.146 0 .21-.071.209-.217-.003-.264-.005-.528.002-.793.01-.411.287-.713.667-.734.407-.022.726.23.773.646.03.27.025.543.02.815-.002.185.058.281.255.317.39.07.603.34.606.74.004.614.004 1.23 0 1.843-.005 1.224-.73 2.302-1.874 2.728-.276.103-.338.242-.337.51.008 2.606.006 5.212.005 7.818 0 .813-.218 1.56-.764 2.175-.899 1.014-2.033 1.382-3.333 1-1.3-.381-2.05-1.3-2.27-2.638-.03-.182-.017-.372-.017-.56-.002-1.229 0-2.458-.002-3.687 0-.479-.1-.928-.427-1.3-.27-.31-.605-.519-1.016-.57-.219-.027-.291-.12-.28-.332.012-.272.001-.545.002-.817.002-.333.038-.37.365-.322 1.045.15 1.845.676 2.383 1.584.282.478.419 1 .417 1.558a564.283 564.283 0 0 0 0 3.968c.004 1.024.768 1.8 1.756 1.795.927-.003 1.706-.761 1.712-1.688.01-1.346.003-2.692.003-4.038h.001v.002Z" />
      <Path d="M6.194 5.222c.654 0 1.308.006 1.963-.004.225-.003.323.065.318.305-.012.615-.01 1.229-.001 1.843.003.211-.077.292-.285.29a711.457 711.457 0 0 0-3.996 0c-.192 0-.284-.06-.28-.269.008-.63.009-1.26 0-1.89-.004-.22.093-.28.295-.278.662.006 1.324.002 1.986.002v.001Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export { SvgComponent as Install }