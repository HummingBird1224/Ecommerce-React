import { render, screen } from "@testing-library/react";
import ItemView from "./itemView";

test("renders Item View page", () => {
	render(<ItemView/>);
	const linkElement = screen.getByTestId("Itemview");
	expect(linkElement).toBeInTheDocument();
});

