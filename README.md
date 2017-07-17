# React Radial Gauge

![Gauge 1](https://veerasundar.com/img/gauges/opt-1.png) ![Gauge 2](https://veerasundar.com/img/gauges/opt-2.png) ![Gauge 3](https://veerasundar.com/img/gauges/opt-3.png)

Create beautiful gauges in React. Customize each part of the gauge components to your need. 

## Installation

```javascript
npm install react-radial-gauge
```

## Usage

```javascript
import Gauge from 'react-radial-gauge';

class AwesomeComponent esteds React.Component {
    render() {
        let opts = {/* Gauge customization */}
        return (
            <Gauge {...opts} />
        )
    }
}
```

## Customizing the Gauge

In order you see a demo of how to customize the Gauge, have a look at the [online Gauge generator](https://veerasundar.com/gauge-generator).

You can pass in the below props to the `<Gauge/>` component to customize the Radial Gauge look.

| prop | Description | Value |
|------|-------------|------|
| size | Size of the gauge. 200 Will render a 200x200 Gauge. | Integer |
|currentValue | Gauges value. The progress and needle will be rendered according to this value. | Integer (1 to 100) |
| dialWidth|  Size of the radial dial| Integer |
| dialColor| Color of the radial dial| Hex code  |
| progressWidth| Size of the progress bar | Integer |
| progressColor| Color of the progress bar | Hex code |
| tickLength| Length of the ticks | Integer|
| tickWidth| Width of the ticks | Integer|
| tickColor| Color of the ticks | Hex code |
| needleColor| Color of the needle | Hex code |
| needleBaseSize| Needle base size | Integer|
| needleBaseColor| Needle base color | Hex code |
| needleWidth| Width of the needle | Integer|
| needleSharp| Should the needle be arrow or a line. If true, an arrow will be drawn, else a line.| true / false |




