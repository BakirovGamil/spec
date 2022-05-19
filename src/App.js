import './null.css';
import './main.css';
import { Route, Routes } from 'react-router-dom';
import Meet from "./pages/Meet/Meet"
import { createRef, useEffect } from 'react';
import Main from './pages/Main';
import Authorization from './pages/Authorization/Authorization';
import Login from './pages/Login/Login';
import ProfileId from './pages/ProfileId/ProfileId';

function App() {
	const wrapperRef = createRef();

	useEffect(() => {
		const theme = window.localStorage.getItem('theme'); // если пусто, то null

		changeTheme(theme);
	}, []);

	function changeTheme(theme) {
		document.body.className = "";
		switch(theme) {
			case 'light':
				document.body.classList.add('light');
				break;
			case 'dark':
				document.body.classList.add('dark');
				break;
			default: 
				const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
				if(isDark) {
					document.body.classList.add('dark');
					break;
				}

				document.body.classList.add('light');
				break;
		}
	}

	return (
		<div className='wrapper' ref={wrapperRef}>
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="meet" element={<Meet />} />
				<Route path="authorization" element={<Authorization />} />
				<Route path="login" element={<Login />} />
				<Route path="profile" element={<ProfileId />} />
			</Routes>
		</div>
	);
}

export default App;