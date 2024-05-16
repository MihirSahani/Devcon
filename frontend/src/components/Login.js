import DjangoCSRFToken from 'django-react-csrftoken';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { MyContext } from '../App';
import { PROJECT_TITLE, LOGIN_TITLE, LOGIN_BTN_TEXT, SIGNUP_BTN_TEXT, SIGNUP_TITLE, BASE_URL, TOKEN } from '../utils';

export default function Login() {

	const [incorrectUP, setIncorrectUP] = useState(false);

	const [navigate, token, setToken, uname, setUname] = useContext(MyContext);
	const [formData, setFormData] = useState({});

	async function handleSubmit(e) {
		e.preventDefault();

		await fetch(BASE_URL+'/auth/token', {
			method: "POST", 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
		.then(response => response.json())
		.then(response => {
			if(typeof(response.token)!=='undefined') {
				setIncorrectUP(false);
				setToken(response.token)
				setUname(formData.username)
				console.log('---------------///----------------token: ', token);
				console.log('-------------------------------');

				navigate("/home");
			}
			else {
				console.log('-------------------------------');
				setIncorrectUP(true);
			}
			return response;
		})
		.catch(error => console.error("Error: ", error))

	}

	function handleChange(e) {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	}

	const inputs = [
		{
			type: "text",
			placeholder: "USERNAME",
			name: "username"
		},
		{
			type: "password",
			placeholder: "PASSWORD",
			name: "password"
		},
	];

	const inputComponents = inputs.map((x, index)=>{
		return <input key={index} {...x} onChange={handleChange} required />
	})

	return(
		<>
			<div className="page-header">
				<h1>{PROJECT_TITLE}</h1>
			</div>
			<div className="page center">
				<div className="dialog">
					<div className="dialog-title center">
						<h3>{LOGIN_TITLE}</h3>
					</div>
					<div className="dialog-body">
						<form action="#" className="center" onSubmit={handleSubmit}>
							<DjangoCSRFToken />
							{inputComponents}
							<p className='warning'>{incorrectUP?"Incorrect username or password":""}</p>
							<div className="center">
								<button type="submit">{LOGIN_BTN_TEXT}</button>
							</div>
						</form>
						<Link className="anchor" to="/signup">{SIGNUP_TITLE}</Link>
					</div>
				</div>
			</div>
		</>
	);
}