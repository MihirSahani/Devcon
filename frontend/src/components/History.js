import { HISTORY_DEFAULT_MESSAGE, HISTORY_TITLE } from '../utils';
import { useContext } from 'react';
import { MyContext } from '../App';
import Navbar from './Navbar';

export default function History() {

	const [navigate, token, setToken, uname, setUname] = useContext(MyContext);


	return(
		<>
			<Navbar />
			<div className="page-header">
				<h2>{HISTORY_TITLE}</h2>
			</div>
			<div className="page center">
				<h3>{HISTORY_DEFAULT_MESSAGE}</h3>
			</div>
		</>
	);
}