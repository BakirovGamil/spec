import './null.css';
import './main.css';
import { Route, Routes } from 'react-router-dom';
import Meet from './pages/Meet/Meet'
import { createContext, createRef, useEffect, useState } from 'react';
import Main from './pages/Main';
import Authorization from './pages/Authorization/Authorization';
import Login from './pages/Login/Login';
import ProfileId from './pages/ProfileId/ProfileId';
import ProfilePhotos from './pages/ProfilePhotos/ProfilePhotos';
import ProfileComments from './pages/ProfileComments/ProfileComments';
import SpecialistRegistration from './pages/SpecialistRegistration/SpecialistRegistration';
import AuthorizationService from './API/AuthorizarizationService';
import useFetching from './hooks/useFetching';

export const UserContext = createContext(null);

function App() {
	const [authUser, setAuthUser] = useState(null);
	const wrapperRef = createRef();

	const [isLoadingAuth, fethAuth, errorAuth] = useFetching(async () => {
		const resAuthUser = await AuthorizationService.getCurrentUser();
		const authUser = await resAuthUser.json();
		
		if(resAuthUser.ok) {
			setAuthUser(authUser);
		} else {
			console.log(authUser.message);
		}
	});

	useEffect(() => {
		const theme = window.localStorage.getItem('theme'); // если пусто, то null
		
		changeTheme(theme);

		(async function() {
			await fethAuth();

			if(errorAuth) {
				console.log(errorAuth);
			}
		})();
	}, []);

	return (
		<UserContext.Provider value={[authUser, setAuthUser]}>
			<div className='wrapper' ref={wrapperRef}>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='meet' element={<Meet />} />
					<Route path='authorization' element={<Authorization />} />
					<Route path='login' element={<Login />} />
					<Route path='profile' element={<ProfileId />} />
					<Route path='profile/photos' element={<ProfilePhotos />} />
					<Route path='profile/comments' element={<ProfileComments />} />
					<Route path='specialist/registration' element={<SpecialistRegistration />} />
				</Routes>
			</div>
		</UserContext.Provider>
	);
}

export default App;


function changeTheme(theme) {
	document.body.className = '';
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