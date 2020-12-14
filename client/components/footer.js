import React from 'react'

export class Footer extends React.Component {
  render() {
    return (
      <footer className="footer-container">
        <div className="footer-left">
          <a className="author" href="https://www.linkedin.com/in/sernano/">
            <img src="../images/unamusedMonster_blue.png" />
            <p>Samantha Ernano</p>
          </a>
          <a
            className="author"
            href="https://www.linkedin.com/in/amanda-barrafato/"
          >
            <img src="../images/unamusedMonster_purple.png" />
            <p>Amanda Barrafato</p>
          </a>
          <a
            className="author"
            href="https://www.linkedin.com/in/nicole-mastrodomenico/"
          >
            <img src="../images/unamusedMonster_green.png" />
            <p>Nicole Mastrodomenico</p>
          </a>
          <a className="author" href="https://linkedin.com/in/camila-browne">
            <img src="../images/unamusedMonster_orange.png" />
            <p>Camila Browne</p>
          </a>
        </div>
        <div className="footer-right">
          <a href="https://github.com/the-exquisite-game/exquisite-corpse">
            <i className="fa fa-github" />
          </a>
          <div>Exquisite Corpse © 2020</div>
        </div>
      </footer>
    )
  }
}
