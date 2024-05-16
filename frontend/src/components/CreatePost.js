import { useContext, useState } from 'react';
import DjangoCSRFToken from 'django-react-csrftoken';

import { BASE_URL, CREATE_POST_HELPER, CREATE_POST_TITLE, PROJECT_TITLE } from '../utils';
import Navbar from './Navbar';
import { MyContext } from '../App';

export default function CreatePost() {

	const [navigate, token, setToken, uname, setUname] = useContext(MyContext);
	const [formData, setFormData] = useState({"uname": uname});

	if(token==='') {
		navigate('/login');
	}

	async function handleSubmit(e) {
		e.preventDefault();

		await fetch(BASE_URL+'api/message', {
			method: "POST", 
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Token "+token,
			},
			body: JSON.stringify(formData),
		})
		.then(response => response.json())
		.then(response =>{
			console.log(formData)
			if(response.message==='success') {
				navigate("/home");
			}
			else {
				alert("post creating failed.")
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

	return(
		<>
			<Navbar />
			<div className="page-header">
				<h2>{PROJECT_TITLE}</h2>
			</div>
			<div className="page center">
				<div className="dialog">
					<div className="dialog-title">
						<h3>{CREATE_POST_TITLE}</h3>
					</div>
					<div className="dialog-body">
						<form className="center" onSubmit={handleSubmit}>
							<DjangoCSRFToken />
							<textarea name="message" placeholder={CREATE_POST_HELPER} cols="20" rows="10" onChange={handleChange} ></textarea>
							<button className='btn' type='submit'>Upload</button>
						</form>
					</div>
				</div>
			</div>

		</>
	);
}