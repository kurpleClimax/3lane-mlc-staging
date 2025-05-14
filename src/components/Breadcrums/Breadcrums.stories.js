import * as React from 'react'

import Breadcrums from './Breadcrums'

export default {
  title: 'Components/Breadcrums',
  component: Breadcrums,
}

const Template = (args) => <Breadcrums {...args} />

export const Default = Template.bind({})
Default.args = {}
