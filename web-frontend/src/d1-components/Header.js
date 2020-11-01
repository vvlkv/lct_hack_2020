import React, {useContext, useState} from 'react';
import { AlarmFill, Terminal, ArrowRightSquare, Gear, InboxesFill, BriefcaseFill, PersonFill, HouseFill} from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import PropTypes from 'prop-types';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

function Header() {
    Navbar.propTypes = {
        light: PropTypes.bool,
        dark: PropTypes.bool,
        fixed: PropTypes.string,
        color: PropTypes.string,
        role: PropTypes.string,
        expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
        // pass in custom element to use
    }


    const { authToken } = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);


    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/"><AlarmFill viewBox="0 0 20 20" size={24}/>События</NavLink>
                        </NavItem>
                        {authToken ?
                            <React.Fragment>
                                <NavItem>
                                    <NavLink href="/workers"><PersonFill viewBox="0 0 20 20" size={24}/>Рабочие</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/objects"><HouseFill viewBox="0 0 20 20" size={24}/>Объекты</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/companies"><BriefcaseFill viewBox="0 0 20 20" size={24}/>Застройщики</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/logout"><ArrowRightSquare style={{color: '#BF3030'}} viewBox="0 0 20 20" size={24}/></NavLink>
                                </NavItem>
                            </React.Fragment> : null}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}




export default Header;
