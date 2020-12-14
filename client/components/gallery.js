import React from 'react'
import axios from 'axios'

export class Gallery extends React.Component {
  constructor() {
    super()
    this.state = {
      monsters: [],
      pageNum: 0
    }
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
  }
  async componentDidMount() {
    const res = await axios.get('/api/')
    this.setState({monsters: res.data})
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
        <div id="monsters-container">
          {monsters.slice(pageNum * 10, (pageNum + 1) * 10).map(monster => (
            <div className="monster shake-trigger" key={monster.id}>
              <div
                id="frame"
                className={
                  monster.id % 2
                    ? 'shake-slow shake-constant--hover'
                    : 'shake-chunk shake-constant shake-constant--hover'
                }
              >
                <img src={monster.imageUrl} />
              </div>
              <div className="name">{monster.name}</div>
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
          {this.state.pageNum !==
            Math.ceil(this.state.monsters.length / 10) - 1 && (
            <button type="button" onClick={this.nextPage}>
              {' '}
              next{' '}
            </button>
          )}
        </div>
      </div>
    )
  }
}
