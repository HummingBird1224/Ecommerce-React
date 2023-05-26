import { render, screen } from "@testing-library/react";
import Eauctions from "./eauctions";

test("renders Eauctions page", () => {
	render(<Eauctions/>);
	const linkElement = screen.getByTestId("Eauctions");
	expect(linkElement).toBeInTheDocument();
});

test("renders Eauctions Filter", () => {
	render(<Eauctions/>);
	const linkElement = screen.getByTestId("EauctionsFilters");
	expect(linkElement).toBeInTheDocument();
});

test("renders Eauctions searchbar", () => {
	render(<Eauctions/>);
	const linkElement = screen.getByTestId("EauctionsSearchbar");
	expect(linkElement).toBeInTheDocument();
});
