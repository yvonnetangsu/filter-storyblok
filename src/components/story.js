import React from 'react'
import SbEditable from 'storyblok-react'

const Story = (props) => (
  <SbEditable content={props.blok}>
    <div className="story">
      <div className="container">
        <h1 className="title">{ props.blok.title }</h1>
        <p className="intro">{ props.blok.intro }</p>
        <p className="lead">

        </p>
      </div>
    </div>
  </SbEditable>
)

export default Story
