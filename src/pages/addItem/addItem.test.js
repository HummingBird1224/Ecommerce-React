import { render, screen } from "@testing-library/react";
import AddItem from "./addItem";


test("renders Marketplace page", () => {
	render(<AddItem/>);
	const linkElement = screen.getByTestId("itemDetailsForm");
	expect(linkElement).toBeInTheDocument();
});

test("renders Marketplace Filter", () => {
	render(<AddItem/>);
	const linkElement = screen.getByTestId("biddingSetupForm");
	expect(linkElement).toBeInTheDocument();
});

test("renders Marketplace searchbar", () => {
	render(<AddItem/>);
	const linkElement = screen.getByTestId("locationForm");
	expect(linkElement).toBeInTheDocument();
});

test("renders Marketplace searchbar", () => {
	render(<AddItem/>);
	const linkElement = screen.getByTestId("imageForm");
	expect(linkElement).toBeInTheDocument();
});

test("renders Marketplace searchbar", () => {
	render(<AddItem/>);
	const linkElement = screen.getByTestId("actionCard");
	expect(linkElement).toBeInTheDocument();
});
