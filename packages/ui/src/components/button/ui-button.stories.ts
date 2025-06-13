import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, type ButtonProps } from "#components/button/button";

const meta: Meta<ButtonProps> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    children: "I am a primary button.",
    className: "primary-btn", // 필요시 커스텀 클래스
  },
};

export const WithCustomClass: Story = {
  args: {
    children: "Custom Class Button",
    className: "my-custom-class",
  },
};
