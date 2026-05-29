import './index.css'

const Blinker = ({
  bgColor = 'rgb(171, 0, 11)',
  shadowColor = 'rgb(255, 138, 138)',
  size = 8,
}) => {
  const rgbColor = shadowColor
    .match(/\d+/g) // Extract RGB values
    .slice(0, 3) // Get only R, G, B
    .join(', ') // Join into "R, G, B" format
  const initialSize = size / 4
  const style = {
    '--shadow-color': rgbColor,
    backgroundColor: bgColor,
    '--size': `${size}px`,
    '--initialSize': `${size - initialSize}px`,
  }
  return <span style={style} className="blinker-wrap" />
}

export default Blinker
