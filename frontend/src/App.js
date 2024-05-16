import './App.css';
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import { useState, createContext, useContext } from 'react';

import { INDEX_TITLE, PROJECT_TITLE, SIGNUP_BTN_TEXT, LOGIN_BTN_TEXT } from './utils';
import Home from './components/Home';
import Login from './components/Login';
import Friends from './components/Friends';
import CreatePost from './components/CreatePost';
import History from './components/History';
import {UserSettings, SettingProfile, DeleteAccount} from './components/UserSettings';
import Signup from './components/Signup';

export function Index() {

	const [navigate] = useContext(MyContext);
	
	return(
		<>
			<div className="page-header">
				<h1>{PROJECT_TITLE}</h1>
			</div>
			<div className='page center'>
				<div className="dialog frosted">
					<div className="dialog-title center">
						<h3>{INDEX_TITLE}</h3>
					</div>
					<div className="dialog-body center">
						<div className="flex-space-around">
							<button onClick={() => navigate("/login")}>{LOGIN_BTN_TEXT}</button>
							<button onClick={()=> navigate("/signup")}>{SIGNUP_BTN_TEXT}</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export const MyContext = createContext();

function App() {
	
	const navigate = useNavigate();
	const [token, setToken] = useState("");
	const [uname, setUname] = useState("");
	
	return (
		<MyContext.Provider value={[navigate, token, setToken, uname, setUname]}>
			<Routes>
				<Route path="/" element={<Index />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/signup" element={<Signup/>}></Route>
				<Route path="/home" element={<Home />}></Route>
				<Route path="/friends" element={<Friends />}></Route>
				<Route path="/create-post" element={<CreatePost />}></Route>
				<Route path="/history" element={<History />}></Route>
				<Route path="/user-setting" element={<UserSettings />}></Route>
				<Route path="/delete" element={<DeleteAccount />}></Route>
			</Routes>
		</MyContext.Provider>
	);
}

export default App;
