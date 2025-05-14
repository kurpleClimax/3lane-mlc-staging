import * as React from "react";

import CustomLink from "./CustomLink";

export default {
  title: "Components/CustomLink",
  component: CustomLink,
};

const Template = (args) => <CustomLink {...args} />;

export const Default = Template.bind({});

Default.args = {
  otherClasses: "inline-block mx-10 my-10",
  variant: { color: "orange", type: "filled", size: "lg" },
  anchor: {
    title: "Learn more",
    url: "/learn-more",
    target: "_blank",
  },
};
