import React from 'react'

const Palette = props => {
  return (
    <div id="palette">
      <button
        type="button"
        name="tool"
        onClick={props.handleChange}
        value="pen"
      >
        Pen
      </button>
      <button
        type="button"
        name="tool"
        value="eraser"
        onClick={props.handleChange}
      >
        Eraser
      </button>
      {/* <select value={props.tool}
          onChange={() => {props.handleToolChange(event)}} defaultValue = "pen">
          <option value="pen">Pen</option>
          <option value="eraser">Eraser</option>
        </select> */}

      <button
        type="button"
        name="brushSize"
        onClick={props.handleChange}
        value="5"
      >
        Small
      </button>
      <button
        type="button"
        name="brushSize"
        onClick={props.handleChange}
        value="10"
      >
        Medium
      </button>
      <button
        type="button"
        name="brushSize"
        onClick={props.handleChange}
        value="20"
      >
        Large
      </button>

      {/* colors */}
      <div className="colorSelector">
        <button
          type="button"
          className="red"
          name="color"
          value="#FE797B"
          onClick={props.handleChange}
        >
          red
        </button>

        <button
          type="button"
          className="orange"
          name="color"
          value="#FFB750"
          onClick={props.handleChange}
        >
          orange
        </button>

        <button
          type="button"
          className="yellow"
          name="color"
          value="#FFEA56"
          onClick={props.handleChange}
        >
          yellow
        </button>

        <button
          type="button"
          className="green"
          name="color"
          value="#8FE968"
          onClick={props.handleChange}
        >
          green
        </button>

        <button
          type="button"
          className="blue"
          name="color"
          value="#36CEDC"
          onClick={props.handleChange}
        >
          blue
        </button>

        <button
          type="button"
          className="purple"
          name="color"
          value="#A587CA"
          onClick={props.handleChange}
        >
          purple
        </button>
      </div>
    </div>
  )
}

export default Palette
