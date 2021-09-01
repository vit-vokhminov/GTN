import React from "react";
import { withRouter } from "react-router";
import { Link, Route, Router, Switch, useParams } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent } from "@testing-library/react";

const Home = () => <h1>Home page</h1>;
const Search = () => <h1>Search page</h1>;

const LocationDisplay = withRouter(({ location }) => (
    <div data-testid="location-display">{location.pathname}</div>
));

const RouterComponent = () => (
    <>
        <nav data-testid="navbar">
            <Link data-testid="home-link" to="/">
                Home
            </Link>
            <Link data-testid="about-link" to="/search">
                About
            </Link>
        </nav>

        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/search" component={Search} />
            {/*<Route path="/cabinet" component={Cabinet} />
            <Route path="/verify" component={Verify} />
            <Route path="/reset_pwd_email/:token" component={RecoveryPassword} />
            <Route path="/information" component={Information} />
            <Route component={NotFound} /> */}
        </Switch>

        <LocationDisplay />
    </>
);

const renderWithRouter = (
    component,
    { route = "/", history = createMemoryHistory({ initialEntries: [route] }) } = {}
) => {
    const Wrapper = ({ children }) => <Router history={history}>{children}</Router>;
    return {
        ...render(component, { wrapper: Wrapper }),
        history,
    };
};

describe("React Router", () => {
    it("should render the home page", () => {
        const { container, getByTestId } = renderWithRouter(<RouterComponent />);
        const navbar = getByTestId("navbar");
        const link = getByTestId("home-link");
        expect(container.innerHTML).toMatch("Home page");
        expect(navbar).toContainElement(link);
    });

    it("should navigate to the contact page", () => {
        const { container, getByTestId } = renderWithRouter(<RouterComponent />);
        fireEvent.click(getByTestId("contact-link"));
        expect(container.innerHTML).toMatch("John Doe");
    });
});
