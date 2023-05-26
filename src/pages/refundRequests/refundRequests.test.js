import { render, screen } from "@testing-library/react";
import RefundRequests from "./refundRequests";

test("renders Refund request page", () => {
	render(<RefundRequests/>);
	const linkElement = screen.getByTestId("RefundRequests");
	expect(linkElement).toBeInTheDocument();
});
