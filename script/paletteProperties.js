/*
  I like this file for setting some values for your palette. I wouldn't necessary consider it a "script" though. Perhaps a good location for this could be inside of the client folder and inside of a new "utilities" folder? Or a folder called "assets"?
*/

export const lightColors = {
  red: '#FE797B',
  orange: '#FFB750',
  yellow: '#FFEA56',
  green: '#8FE968',
  blue: '#36CEDC',
  purple: '#A587CA',
  white: 'white'
}

export const darkColors = {
  dkred: '#C1301C',
  dkorange: '#C96112',
  dkyellow: '#C4A705',
  dkgreen: '#177245',
  dkblue: '#2E5793',
  dkpurple: '#4B2882',
  black: 'black'
}

export const tools = {
  pen: {
    name: 'tool',
    value: 'pen',
    icon: '/images/brush.png'
  },

  eraser: {
    name: 'tool',
    value: 'eraser',
    icon: '/images/eraser.png'
  },

  small: {
    name: 'brushSize',
    value: '5',
    icon: '/images/pt_sm.png'
  },

  medium: {
    name: 'brushSize',
    value: '10',
    icon: '/images/pt_med.png'
  },

  large: {
    name: 'brushSize',
    value: '20',
    icon: '/images/pt_LG.png'
  },

  clear: {
    name: 'clear',
    value: 'clear',
    icon: '/images/trash.png'
  },

  undo: {
    name: 'undo',
    value: 'undo',
    icon: '/images/undo.png'
  }
}
