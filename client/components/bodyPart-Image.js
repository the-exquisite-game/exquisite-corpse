import React from 'react'
import {Image} from 'react-konva'
import useImage from 'use-image'

//scale image down to 200
export default function BodyPartImage(props) {
  const [image] = useImage(props.image)
  return (
    <Image x={props.x} y={props.y} image={image} scaleX={0.4} scaleY={0.4} />
  )
}
