import React from 'react'
import {lightColors, darkColors, tools} from '../../script/paletteProperties.js'

const Palette = props => {
  return (
    <div id="palette">
      {/* colors */}
      <div className="colorSelector">
        <div className="light">
          {Object.keys(lightColors).map(element => {
            return (
              <button
                key={element}
                type="button"
                style={{backgroundColor: lightColors[element]}}
                className={element}
                name="color"
                value={lightColors[element]}
                onClick={props.handleChange}
              />
            )
          })}
        </div>
        <div className="dark">
          {Object.keys(darkColors).map(element => {
            return (
              <button
                key={element}
                type="button"
                style={{backgroundColor: darkColors[element]}}
                className={element}
                name="color"
                value={darkColors[element]}
                onClick={props.handleChange}
              />
            )
          })}
        </div>
      </div>
      {/* tools */}
      <div className="toolSelector">
        {Object.keys(tools).map(element => {
          return (
            <button
              key={element}
              type="button"
              className="tool"
              style={{
                backgroundImage: `url(${tools[element].icon})`
              }}
              name={tools[element].name}
              value={tools[element].value}
              onClick={props.handleChange}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Palette
