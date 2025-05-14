import * as React from 'react'

import Header from './Header'
import mocks from './mocks'

export default {
  title: 'Components/Header',
  component: Header,
}

const Template = (args) => <Header {...args} />

export const Default = Template.bind({})
Default.args = {...mocks}
