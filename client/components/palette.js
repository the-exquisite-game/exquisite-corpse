import React from 'react'
import {lightColors, darkColors, tools} from '../utility/utilityProperties.js'

class Palette extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: 'black'
    }
    this.colorSelect = this.colorSelect.bind(this)
  }

  colorSelect(e) {
    this.props.handleChange(e)
    this.setState({
      selected: e.target.value
    })
  }

  render() {
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
                  className={`palette-button${
                    this.state.selected === lightColors[element]
                      ? '-selected'
                      : ''
                  }`}
                  name="color"
                  value={lightColors[element]}
                  onClick={this.colorSelect}
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
                  className={`palette-button${
                    this.state.selected === darkColors[element]
                      ? '-selected'
                      : ''
                  }`}
                  name="color"
                  value={darkColors[element]}
                  onClick={this.colorSelect}
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
                onClick={this.props.handleChange}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default Palette
