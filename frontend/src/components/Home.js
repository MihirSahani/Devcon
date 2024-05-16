import { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { MyContext } from '../App';
import { BASE_URL, PROJECT_TITLE, USER_NAME } from '../utils';


export default function Home() {
	
	const [message, setMessage] = useState([]);
	const [navigate, token, setToken, uname, setUname] = useContext(MyContext);
	const [toggleRefresh, setToggleRefresh] = useState(false);
	
	function Message({dtime, id, message, user, like_count, dislike_count}) {
		const [navigate, token, setToken, uname, setUname] = useContext(MyContext);
		// const [likeCount, setLikeCount] = useState(like_count)
		// const [dislikeCount, setDislikeCount] = useState(dislike_count)
		
		async function handleLike() {
			await fetch(BASE_URL+'api/like', {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": "Token "+token,
				},
				body: JSON.stringify({
					id: id,
					uname: uname,
				})
			})
			.then(response => response.json())
			.then(response => {
				if(response.message==='failed') {
					console.log("Message sending failed.");
				}
				handleRefresh();
			})
		}
	
		async function handleDislike() {
			await fetch(BASE_URL+'api/dislike', {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": "Token "+token,
				},
				body: JSON.stringify({
					id: id,
					uname: uname,
				})
			})
			.then(response => response.json())
			.then(response => {
				if(response.message==='failed') {
					console.log("Message sending failed.");
				}
				handleRefresh();
			})
		}
		async function handleComment() {
	
		}
		return(
			<div className="message frosted">
				<div className="message-header flex-space-around">
					<div>
						<h4>{user.first_name} {user.last_name}</h4>
						<h6>@{user.username}</h6>
					</div>
					<div>
						<h5>{dtime[11]}{dtime[12]}{dtime[13]}{dtime[14]}{dtime[15]} {dtime[8]}{dtime[9]}.{dtime[5]}{dtime[6]}.{dtime[2]}{dtime[3]}</h5>
					</div>
				</div>
				<div className="message-body">
					<p className="message-content">{message}</p>
				</div>
				<div className="message-footer flex-space-around">
					<div className='flex-space-around'>
						<div className="flex-left">
						<button	onClick={handleLike} className="vanila flex"><i className="las la-lg la-fw la-thumbs-up"></i><p className='white'>{like_count}</p></button>
						</div>
						<div className="flex-left">
						<button	onClick={handleDislike} className="vanila flex"><i className="las la-lg la-fw la-thumbs-down"></i><p className='white'>{dislike_count}</p></button>
						</div>
					</div>
					<button	onClick={handleComment} className="vanila"><i className="las la-lg la-fw la-reply"></i></button>
				</div>
			</div>
		);
	}
	
	if(token==='') {
		navigate('/login');
	}

	useEffect( () => {
		
		async function fetchFeed() {
			await fetch(BASE_URL+"api/message", {
				method: "GET",
				headers: {
					'Content-Type': 'application/json',
					"Authorization": "Token "+token,
				},
			})
			.then(response => response.json())
			.then(response => {
				setMessage(response);
			})
		}
		
		fetchFeed();
	}, [toggleRefresh])

	function createFeed() {
		console.log(message);
		if(message.length>0) {
			return message.map((x, index) => <Message key={index} {...x} />);
		}
		else {
			return  (
				<div className="page top">
					<p>No messages yet</p>
				</div>
			);
		}
	}

	let messageComponents = createFeed();
	useEffect( ()=> {
		setInterval( ()=> {
			setToggleRefresh(prev => !prev);
			messageComponents = createFeed();
		}, 1000)

		return clearInterval();
	}, [])

	function handleRefresh() {
		setToggleRefresh(prev => !prev)
		messageComponents = createFeed();
	}

	
	return(
		<>
			<Navbar />
			<div className="page-header flex-space-around frosted">
				<h2>{PROJECT_TITLE}</h2>
				<button onClick={handleRefresh} className='simple'><i className="las la-2x la-sync"></i></button>
			</div>
			<div className="page center trim-top-bottom">
				{messageComponents}
			</div>
		</>
	);
}