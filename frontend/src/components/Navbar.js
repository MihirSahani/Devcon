import {Link} from 'react-router-dom';

export default function Navbar() {
	return(
		<nav className="navbar">
			<ul className="navbar-list">
				<li><Link className="anchor" to="/home"><i className="las la-home la-2x"></i></Link></li>
				<li><Link className="anchor" to="/friends"><i className="las la-users la-2x"></i></Link></li>
				<li><Link className="anchor" to="/create-post"><i className="las la-plus-circle la-2x"></i></Link></li>
				<li><Link className="anchor" to="/history"><i className="las la-history la-2x"></i></Link></li>
				<li><Link className="anchor" to="/user-setting"><i className="las la-cog la-2x"></i></Link></li>
			</ul>
		</nav>
	);
}