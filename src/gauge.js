import React, { Component } from "react";

const TICK_ID = 'tick';

export default class Gauge extends Component {

  defineTick = (opts) => {
    const tX1 = (opts.cX + opts.radius) - (Math.max(opts.dialWidth, opts.progressWidth) / 2);
    const tX2 = tX1 - opts.tickLength;
    return (<line
      id={TICK_ID}
      x1={tX1}
      y1={opts.cY}
      x2={tX2}
      y2={opts.cY}
      stroke={opts.tickColor}
      strokeWidth={opts.tickWidth}
    />);
  };

  renderDial = opts => (
    <circle
      cx={opts.cX}
      cy={opts.cY}
      r={opts.radius}
      fill="none"
      stroke={opts.dialColor}
      strokeWidth={opts.dialWidth}
    />
  );

  renderTicks = (opts) => {
    if (opts.renderTicks === false) {
      return '';
    }
    const tickAngles = [];
    for (let i = 0; i <= 360; i += opts.tickInterval) {
      tickAngles.push(i);
    }
    return (
      <g className="ticks">
        {
          tickAngles.map(tickAngle => (
            <use
              href={`#${TICK_ID}`}
              key={`tick-${tickAngle}`}
              transform={`rotate(${tickAngle} ${opts.cX} ${opts.cY})`}
            />
          ))
        }
      </g>
    );
  };

  renderProgress = (opts) => {
    const offset = (opts.circumference * (1 - (opts.currentValue / opts.maximumValue)));
    return (
      <circle
        cx={opts.cX}
        cy={opts.cY}
        r={opts.radius}
        fill="none"
        stroke={opts.progressColor}
        strokeWidth={opts.progressWidth}
        strokeDasharray={opts.circumference}
        strokeDashoffset={offset}
        strokeLinecap={opts.progressRoundedEdge ? 'round' : 'butt'}
        transform={`rotate(${opts.progressRotation}  ${opts.cX} ${opts.cY})`}
      />
    );
  };

  renderNeedle = (opts) => {
    if (opts.renderNeedle === false) {
      return '';
    }
    const x1 = opts.cX;
    const y1 = opts.cY - (opts.needleWidth / 2);
    const x2 = opts.cX;
    const y2 = opts.cY + (opts.needleWidth / 2);
    const x3 = opts.diameter;
    const y3 = opts.cY;
    const needleAngle = (360 * opts.currentValue) / 100;

    let needleElm = null;
    if (opts.needleSharp) {
      needleElm = (
        <polygon
          points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
          fill={opts.needleColor}
        />
      );
    } else {
      needleElm = (
        <line
          x1={opts.cX}
          y1={opts.cY}
          x2={opts.diameter}
          y2={opts.cY}
          fill="none"
          strokeWidth={opts.needleWidth}
          stroke={opts.needleColor}
        />
      );
    }

    return (
      <g className="needle">
        <g transform={`rotate(${needleAngle} ${opts.cX} ${opts.cY})`}>
          {needleElm}
        </g>
        <circle
          cx={opts.cX}
          cy={opts.cY}
          r={opts.needleBaseSize}
          fill={opts.needleBaseColor}
        />
      </g>
    );
  };

  renderText = opts => (
    <text
      x={opts.cX}
      y={!opts.renderNeedle ? opts.cY + 10 : opts.cY + 55}
      fontFamily={opts.progressFont}
      fontWeight={opts.progressFontWeight}
      transform={`rotate(90 ${opts.cX} ${opts.cY})`}
      textAnchor="middle"
      fill={opts.progressTextColor === '' ? opts.progressColor : opts.progressTextColor}
    >
      <tspan
        fontSize={opts.progressFontSize}
      >
        {opts.currentValue}
      </tspan>
      <tspan
        fontSize={opts.progressFontSize * 0.8}
      >
        {opts.progressFontUnits}
      </tspan>
    </text>
  );

  render() {
    let opts = Object.assign({}, this.props);

    const {
      size,
      dialWidth,
    } = opts;

    const cX = size / 2;
    const cY = size / 2;
    const radius = (size - (2 * dialWidth)) / 2;
    const diameter = 2 * radius;
    const circumference = 2 * Math.PI * radius;
    opts = Object.assign(opts, {
      cX,
      cY,
      radius,
      diameter,
      circumference,
    });

    return (
      <div className={opts.className}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={opts.className}
          height={size}
          width={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <defs>
            {this.defineTick(opts)}
            <linearGradient id="grad" x1="0" y1="0" x2="170" y2="0">
              <stop offset="0" stopColor="rgb(255,255,0)" stopOpacity="0" />
              <stop offset="1" stopColor="red" stopOpacity="1" />
            </linearGradient>
          </defs>
          <g transform={`rotate(-90 ${cX} ${cY})`}>
            {this.renderDial(opts)}
            {this.renderTicks(opts)}
            {this.renderProgress(opts)}
            {this.renderNeedle(opts)}
            {this.renderText(opts)}
          </g>
        </svg>
      </div>
    );
  }
}

Gauge.defaultProps = {
  className: '',
  size: 200,

  dialWidth: 10,
  dialColor: '#eee',

  renderTicks: false,
  tickLength: 3,
  tickWidth: 1,
  tickColor: '#cacaca',
  tickInterval: 10,

  maximumValue: 100,
  currentValue: 25,
  progressWidth: 5,
  progressColor: '#3d3d3d',
  progressTextColor: '',
  progressRoundedEdge: true,
  progressRotation: 0,
  downProgressColor: 'red',
  progressFont: 'Sans-Serif',
  progressFontSize: '40',
  progressFontWeight: '200',
  progressFontUnits: '',

  renderNeedle: false,
  needleBaseSize: 5,
  needleBaseColor: '#9d9d9d',
  needleWidth: 2,
  needleSharp: false,
  needleColor: '#8a8a8a',
};
