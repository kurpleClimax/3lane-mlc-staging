import * as React from 'react'

import NextImage from './NextImage'

export default {
  title: 'Components/NextImage',
  component: NextImage,
}

const Template = (args) => <NextImage {...args} />

export const Default = Template.bind({})
Default.args = {}
