import { Link, redirect } from 'react-router-dom';
import { useContext } from 'react';

import Navbar from './Navbar';
import { MyContext } from '../App';
import { BASE_URL, SETTING_TITLE } from '../utils';

export function DeleteAccount() {
	
	const [navigate, token, setToken, uname, setUname] = useContext(MyContext);
	
	async function handleDelete() {
		await fetch(BASE_URL+"api/delete", {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json',
				"Authorization": "Token "+token,
			},
			body: JSON.stringify({
				"uname": uname,
			}),
		})
		.then(response => response.json())
		.then(response => {
			if(response.message===true) {
				setToken("");
				setUname("");
				navigate("/login");
			}
			else {
				alert("Account deletion failed.");
			}
		})
	}

	return(
		<>
			<Navbar />
			<div className="page-header flex">
				<Link to="/user-setting" className="anchor las la-lg la-angle-left"></Link>
				<h2>Profile</h2>
			</div>
			<div className="page center trim-top-bottom">
				<div className="dialog center">
					<div className="dialog-title ">
						<h4>Do you want to delete you account?</h4>
					</div>
					<div className="dialog-body flex-space-around">
						<button onClick={handleDelete} className="anchor las la-lg la-thumbs-up"></button>
						<Link to="/user-setting" className="las la-lg la-thumbs-down"></Link>
					</div>
				</div>
			</div>
		</>
	);
}

export function UserSettings() {

	const [navigate, token, setToken, uname, setUname] = useContext(MyContext);

	if(token==='') {
		navigate('/login');
	}

	function logout() {
		setUname("");
		setToken("");
		navigate("/login");
	}

	return(
		<>
			<Navbar />
			<div className="page-header">
				<h2>{SETTING_TITLE}</h2>
			</div>
			<div className="page top">
				<ul className="trim-top-bottom">
					<li className="list-element flex-space-around"><Link className='simple' to="/delete">Delete your account</Link><i className="las la-angle-right"></i></li>
					<li className="list-element flex-space-around"><p className='simple' onClick={logout}>Logout</p><i className="las la-angle-right"></i></li>
					<li className="list-element flex-space-around"><p>Delete your account</p><i className="las la-angle-right"></i></li>
					<li className="list-element flex-space-around"><p>Delete your account</p><i className="las la-angle-right"></i></li>
				</ul>
			</div>

		</>
	);
}