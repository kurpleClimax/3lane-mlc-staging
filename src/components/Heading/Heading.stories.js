import * as React from 'react'

import Heading from './Heading'

export default {
  title: 'Components/Heading',
  component: Heading,
  argTypes: {
    type: {
      defaultValue: 'h1',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: { type: 'select' }
    }
  }
}

const Template = (args) => <Heading {...args} />

export const largeText = Template.bind({})
largeText.args = {
  type: 'h6',
  otherClasses:
    'font-bold text-4xl lg:text-[52px] leading-[42.08px] lg:leading-[60.79px] text-gray-900 font-Karla',
  children: 'Large Text Heading lorem ipsum dolor sit amet'
}

export const Heading1 = Template.bind({})
Heading1.args = {
  type: 'h1',
  children: 'H1 Heading lorem ipsum dolor sit amet'
}

export const Heading2 = Template.bind({})
Heading2.args = {
  type: 'h2',
  children: 'H2 Heading lorem ipsum dolor sit amet'
}

export const Heading3 = Template.bind({})
Heading3.args = {
  type: 'h3',
  children: 'H3 Heading lorem ipsum dolor sit amet'
}

export const Heading4 = Template.bind({})
Heading4.args = {
  type: 'h4',
  children: 'H4 Heading lorem ipsum dolor sit amet'
}

export const Heading5 = Template.bind({})
Heading5.args = {
  type: 'h5',
  children: 'H5 Heading lorem ipsum dolor sit amet'
}

export const Heading6 = Template.bind({})
Heading6.args = {
  type: 'h6',
  children: 'H6 Heading lorem ipsum dolor sit amet'
}
