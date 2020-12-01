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
        <div
          className="pastelPurple"
          name="color"
          value="#A587CA"
          backgroundColor="#A587CA"
          onClick={props.handleChange}
        >
          WORD
        </div>
        <div
          className="bleu"
          name="color"
          value="#36CEDC"
          backgroundColor="#36CEDC"
        />
        <div
          className="pastelGreen"
          name="color"
          value="#8SE968"
          backgroundColor="#8SE968"
        />
        <div
          className="yellow"
          name="color"
          value="#FFEA56"
          backgroundColor="#FFEA56"
        />
        <div
          className="orange"
          name="color"
          value="#FFB750"
          backgroundColor="#FFB750"
        />
        <div
          className="red"
          name="color"
          value="#FE797B"
          backgroundColor="#FE797B"
        />
      </div>
    </div>
  )
}

export default Palette
