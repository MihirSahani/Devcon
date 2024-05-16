import DjangoCSRFToken from 'django-react-csrftoken';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { MyContext } from '../App';
import { BASE_URL, LOGIN_TITLE, PROJECT_TITLE, SIGNUP_BTN_TEXT, SIGNUP_TITLE } from '../utils';

export default function Signup() {

	const [navigate, token, setToken, uname, setUname] = useContext(MyContext);
	const [formData, setFormData] = useState({});

	async function handleSubmit(e) {
		e.preventDefault();
		console.log(formData)

		await fetch(BASE_URL+'auth/signup', {
			method: "post", 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
		.then(response => response.json())
		.then(response =>{
			if(response.message==='success') {
				console.log("User created successfully.")
				navigate("/login");
			}
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
			placeholder: "FIRST NAME",
			name: "first_name",
			id: "first_name",
		},
		{
			type: "text",
			placeholder: "LAST NAME",
			id: "last_name",
			name: "last_name",
		},
		{
			type: "email",
			placeholder: "EMAIL ID",
			id: "email",
			name: "email",
		},
		{
			type: "text",
			placeholder: "USERNAME",
			name: "username",
			id: "username"
		},
		{
			type: "password",
			placeholder: "PASSWORD",
			name: "password",
			id: "password",
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
						<h3>{SIGNUP_TITLE}</h3>
					</div>
					<div className="dialog-body">
						<form className="center" action="#" onSubmit={handleSubmit}>
							<DjangoCSRFToken />
							{inputComponents}
							<div className="center">
								<button type='submit'>{SIGNUP_BTN_TEXT}</button>
							</div>
						</form>
						<Link className="anchor" to="/login">{LOGIN_TITLE}</Link>
					</div>
				</div>
			</div>
		</>
	);
}