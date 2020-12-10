import React from 'react'
import axios from 'axios'
import {Splide, SplideSlide} from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'

export class Gallery extends React.Component {
  constructor() {
    super()
    this.state = {
      monsters: [],
      pageNum: 0
    }
    this.primaryRef = React.createRef()
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
  }
  async componentDidMount() {
    const res = await axios.get('/api/')
    this.setState({monsters: res.data})
    this.primaryRef.current.sync()
  }
  nextPage() {
    this.setState(oldState => ({pageNum: oldState.pageNum + 1}))
  }
  previousPage() {
    this.setState(oldState => ({pageNum: oldState.pageNum - 1}))
  }
  render() {
    const {monsters, pageNum} = this.state
    return (
      <div id="gallery">
        <div className="slides">
          {monsters.length && (
            <Splide
              ref={this.primaryRef}
              options={{
                type: 'fade',
                rewind: true,
                direction: 'ttb',
                height: '1200',
                fixedWidth: '680',
                heightRatio: 1,
                pagination: false,
                arrows: false,
                cover: false,
                autoplay: 'playing'
              }}
            >
              {monsters.map(monster => (
                <SplideSlide key={monster.id}>
                  <img src={monster.imageUrl} />
                </SplideSlide>
              ))}
            </Splide>
          )}
        </div>
        {/* {this.state.pageNum > 0 && <LeftButton />} */}
        <div id="monsters">
          <div id="monsters-container">
            {monsters.slice(pageNum * 8, (pageNum + 1) * 8).map(monster => (
              <div className="monster" key={monster.id}>
                <img src={monster.imageUrl} />
                <div>{monster.name}</div>
              </div>
            ))}
          </div>
          <div className="navigationButtons">
            {this.state.pageNum > 0 && (
              <button type="button" onClick={this.previousPage}>
                {' '}
                previous{' '}
              </button>
            )}
            {this.state.pageNum && (
              <button type="button" onClick={this.nextPage}>
                {' '}
                next{' '}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
}
