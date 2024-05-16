import { useContext, useState } from 'react';
import Navbar from './Navbar';
import { BASE_URL } from '../utils';
import { MyContext } from '../App';

function FriendRequests({name, username, timeUploaded, message}) {

	function handleReply() {
		console.log("feature coming soon.");
	}

	return(
		<div className="message flex-space-around">
			<div>
				<h4 className="name-display">{name}</h4>
				<h5 className="username-display">@{username}</h5>
				
				</div>
				<div className="action">
				<button className='anchor las la-lg la-thumbs-up'></button>
				<button className='anchor las la-lg la-thumbs-down'></button>
				</div>
		</div>
	);
}

export default function Friends() {

	const [message, setMessage] = useState([]);
	const [navigate, token, setToken, uname, setUname] = useContext(MyContext);


	if(token==='') {
		navigate('/login');
	}
	
	async function fetchRequests() {
		await fetch(BASE_URL+"/friend-requests/", {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then(response => response.json())
		.then(response => setMessage(response))
		.catch(error => console.log(error))
		// Im setting what response is supposed to return. Remove after implementing backend
	}

	function loadRequest() {
		fetchRequests();
		console.log(message);
		return message.map((x, index)=>(
			
			<li><FriendRequests key={index} {...x} /></li>
		));
	}

	let friendRequestComponents = loadRequest();

	return(
		<>
			<Navbar />
			<div className="page-header">
				<h2>Friend Requests</h2>
			</div>
			<div className='page top'>
				<ul className="trim-top-bottom">
					<p>feature coming soon...</p>
					{/* {friendRequestComponents} */}
				</ul>
			</div>
		</>
	);
}