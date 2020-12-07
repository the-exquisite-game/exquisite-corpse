import React from 'react'
import {Stage, Layer, Image, Rect} from 'react-konva'
import useImage from 'use-image'
import BodyPartImage from './bodyPart-Image'

export const FinalMonster = props => {
  const bodyParts = props.bodyParts
  // array destructuring would look pretty slick here:
  // const [ head, torso, legs, feet ] = bodyParts
  const head = bodyParts[0]
  const torso = bodyParts[1]
  const legs = bodyParts[2]
  const feet = bodyParts[3]

  return (
    <Stage width={600} height={800} ref={props.canvas}>
      <Layer>
        {/* add all of the images together here */}
        <Rect width={600} height={800} fill="#FFFFFF" />
        <BodyPartImage image={head} x={200} y={0} />
        <BodyPartImage image={torso} x={200} y={200} />
        <BodyPartImage image={legs} x={200} y={400} />
        <BodyPartImage image={feet} x={200} y={600} />
      </Layer>
    </Stage>
  )
}
