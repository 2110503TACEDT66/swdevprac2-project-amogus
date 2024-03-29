/* eslint-disable */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import Navbar from "~/layout/Navbar";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: "/", // Mock pathname to simulate being on the homepage
    };
  },
}));

jest.mock("../src/utils/api", () => ({
  api: {
    user: {
      getCurrentUser: {
        useQuery: jest.fn(() => ({
          data: {
            user: { id: "1", name: "Test User", email: "test@example.com" },
          },
          isLoading: false,
          isError: false,
        })),
      },
    },
  },
}));

// If your navigation array is not exported from the Navbar component, you can redefine it in your test file for testing purposes
const navigation = [
  { name: "Browse", href: "/campgrounds" },
  { name: "Your Bookings", href: "/your-bookings" },
  { name: "Among Us", href: "/among-us" },
];

describe("Navbar Links", () => {
  it("renders correct links", () => {
    render(
      <SessionProvider session={null}>
        <Navbar />
      </SessionProvider>,
    );

    // Iterate over each navigation item and check if the link is correct
    navigation.forEach((item) => {
      // Use getByRole with 'link' and name options to ensure accessibility and correctness
      const linkElement = screen.getByRole("link", { name: item.name });
      expect(linkElement).toHaveAttribute("href", item.href);
    });
  });
});
