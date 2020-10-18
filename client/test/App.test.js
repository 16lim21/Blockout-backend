// Some help with react testing https://www.pluralsight.com/guides/unit-test-react-component-mocha
import React from "react";
import { render } from "react-dom";
import App from "../src/App";

describe("renders app", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        render(<App />, div);
    });
});
