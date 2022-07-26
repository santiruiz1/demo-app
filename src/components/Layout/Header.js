import React from "react";
import mealsImage from "../../assets/meals.jpg";
import HeaderCardButton from "./HeaderCardButton";
import { NavLink, useLocation } from "react-router-dom";
import { Navbar, Dropdown, Drawer, Button } from "react-daisyui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHamburger } from "@fortawesome/free-solid-svg-icons";
import MediaQuery from "react-responsive";

const Header = (props) => {
  const location = useLocation();

  const themeHandler = (event) => {
    const newTheme = event.target.innerText.toLowerCase();
    props.onThemeChange(newTheme);
  };

  return (
    <React.Fragment>
      <header className="fixed z-10 top-0 left-0 h-fit w-full bg-neutral">
        <Navbar>
          <Navbar.Start>
            <span className="pl-4">
              <FontAwesomeIcon icon={faHamburger} className="w-8 h-8" />
            </span>
            <h1 className="text-[1.3rem] sm:text-[1.7rem] mx-2 font-bold">
              React Meals
            </h1>
            <div>
              <Dropdown>
                <Dropdown.Toggle color="secondary">Theme</Dropdown.Toggle>
                <Dropdown.Menu className="w-52">
                  <Dropdown.Item>
                    <Button onClick={themeHandler}>Dark</Button>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Button onClick={themeHandler}>Dracula</Button>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Button onClick={themeHandler}>Light</Button>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Button onClick={themeHandler}>Luxury</Button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Navbar.Start>
          <Navbar.End>
            {location.pathname === "/home" && (
              <HeaderCardButton onCartVisibility={props.onCartVisibility} />
            )}
            <MediaQuery maxWidth={640}>
              {location.pathname === "/home" && (
                <h3 className="pl-4 pr-2">Meals</h3>
              )}{" "}
              {location.pathname === "/managment" && (
                <h3 className="pl-4 pr-2">Managment</h3>
              )}
              {location.pathname === "/orders" && (
                <h3 className="pl-4 pr-2">Orders</h3>
              )}
              <div>
                <label
                  htmlFor="open"
                  className="btn btn-secondary drawer-button"
                >
                  <FontAwesomeIcon icon={faBars} />
                </label>
              </div>
            </MediaQuery>
            <MediaQuery minWidth={640}>
              <NavLink className="px-4" activeClassName="font-bold" to="/home">Meals</NavLink>
              <NavLink className="px-4" activeClassName="font-bold" to="/managment">Managment</NavLink>
              <NavLink className="px-4" activeClassName="font-bold" to="/orders">Orders</NavLink>
            </MediaQuery>
          </Navbar.End>
        </Navbar>
      </header>
      <MediaQuery maxWidth={640}>
        <Drawer
          className="h-screen absolute right-0 top-[4rem] w-fit"
          end={true}
          id="open"
          side={
            <ul>
              <li className="pt-2 px-4">
                <NavLink className="w-full" activeClassName="font-extrabold" to="/home">Meals</NavLink>
              </li>
              <li className="pt-2 px-4">
                <NavLink className="w-full" activeClassName="font-extrabold" to="/managment">Managment</NavLink>
              </li>
              <li className="pt-2 px-4">
                <NavLink className="w-full" activeClassName="font-extrabold" to="/orders">Orders</NavLink>
              </li>
            </ul>
          }
        />
      </MediaQuery>
      <div className="w-full h-[20rem] z-0">
        <img
          src={mealsImage}
          className="w-full h-full object-cover"
          alt="A table full of delicious food"
        />
      </div>
    </React.Fragment>
  );
};

export default Header;
