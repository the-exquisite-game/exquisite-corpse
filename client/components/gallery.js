import React from 'react'
import axios from 'axios'
import {Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'

export class Gallery extends React.Component {
  constructor() {
    super()
    this.state = {
      monsters: []
    }
    this.primaryRef = React.createRef()
  }
  async componentDidMount() {
    const res = await axios.get('/api/')
    this.setState({monsters: res.data})
    this.primaryRef.current.sync()
  }
  render() {
    const monsters = this.state.monsters
    return (
      <div id="gallery">
        {/* <div className="slides">
          <Splide
            ref={this.primaryRef}
            options={{
              type: 'fade',
              heightRatio: 0.5,
              pagination: false,
              arrows: true,
              cover: true,
            }}
          >
            {monsters
              .filter((monster) => monster.id < 5)
              .map((monster) => (
                <SplideSlide key={monster.id}>
                  <img src={monster.imageUrl} />
                </SplideSlide>
              ))}
          </Splide>
        </div> */}
        <div id="monsters-container">
          {monsters.map(monster => (
            <div className="monster" key={monster.id}>
              <img src={monster.imageUrl} />
              <div>{monster.name}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
