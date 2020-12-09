import React from 'react'

export const Instructions = () => (
  <div id="instructions">
    <h3>How to play</h3>
    <ol>
      <li>Each turn starts with a blank canvas.</li>
      <li>
        The first player draws a head and with some connecting lines at the base
        of the neck all the way to the bottom of the canvas.
      </li>
      <li>
        The second player draws the torso and arms, using the neck lines as the
        beginning point.{' '}
      </li>
      <li>
        The third player draws the legs and the fourth draws the feet, always
        making sure to leave connecting lines for the next player.
      </li>
      <li>Once everyone is done drawing, a monstrosity will come to life! </li>
    </ol>
  </div>
)
