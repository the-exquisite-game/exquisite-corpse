import React from 'react'
import {Stage, Layer, Rect} from 'react-konva'
import BodyPartImage from './bodyPart-Image'

export const FinalMonster = props => {
  const bodyParts = props.bodyParts
  const [head, torso, legs, feet] = bodyParts

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
