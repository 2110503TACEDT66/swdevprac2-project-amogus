/* eslint-disable */

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Register from "~/pages/register";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockMutateAsync = jest.fn();
jest.mock("../src/utils/api", () => ({
  api: {
    user: {
      register: {
        useMutation: () => ({
          mutateAsync: mockMutateAsync,
        }),
      },
    },
  },
}));

describe("Register Component", () => {
  beforeEach(() => {
    // Clear mocks before each test
    mockPush.mockClear();
    mockMutateAsync.mockClear();
  });

  it("submits the form and navigates on success", async () => {
    render(<Register />);

    // Check for the Name input
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();

    // Check for the Email address input
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();

    // Check for the Telephone number input
    expect(screen.getByLabelText(/Telephone number/i)).toBeInTheDocument();

    // Check for the Password input
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });
});
