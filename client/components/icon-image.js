import React from 'react'
import {Image} from 'react-konva'
import useImage from 'use-image'

const url = '/images/unamusedMonster_green.png'

export default function IconImage() {
  const [image] = useImage(url)

  // "image" will DOM image element or undefined

  return <Image image={image} />
}

// function ComplexApp() {
//   // set crossOrigin of image as second argument
//   const [image, status] = useImage(url, 'Anonymous');

//   // status can be "loading", "loaded" or "failed"

//   return (
//     <Image image={image} />
//   );
// }
