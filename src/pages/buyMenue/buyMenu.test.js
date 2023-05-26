import { render, screen } from "@testing-library/react";
import BuyMenu from "./buyMenu";

test("renders Marketplace page", () => {
	render(<BuyMenu/>);
	const linkElement = screen.getByTestId("BuyMenu");
	expect(linkElement).toBeInTheDocument();
});
