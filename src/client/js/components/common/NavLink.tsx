import * as React from "react"
import { NavLink as Link } from "react-router-dom"

export interface NavLinkProps {
    label: string;
    icon: string;
    link: string;
    isExact?: boolean;
}

class NavLink extends React.Component<NavLinkProps> {
    render() {
        return (
            <Link exact={this.props.isExact} className="nav-link" to={`/${this.props.link}`} activeClassName="activeRoute">
                <span className="link-label">{this.props.label}</span>
                <i className={`fas fa-${this.props.icon}`}></i>
            </Link>
        )
    }
}

export default NavLink;