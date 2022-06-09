import './null.css';
import './main.css';
import { Route, Routes} from 'react-router-dom';
import { createContext, createRef, useEffect, useState } from 'react';
import AuthorizationService from './API/AuthorizarizationService';
import useFetching from './hooks/useFetching';
import {toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import SpecialistService from './API/SpecialistService';
import FavoriteService from './API/FavoriteService';
import FavoriteModal from './components/FavoriteModal/FavoriteModal';
import { publicRoutes, userRoutes, specialistRoutes, adminRoutes } from './routes/routes';
import Cookie from './components/Cookie/Cookie';

export const UserContext = createContext(null);
export const SpecialistContext = createContext(null);
export const FavoriteContext = createContext([]);

function App() {
	const [authUser, setAuthUser] = useState(null);
	const [authSpecialist, setAuthSpecialist] = useState(null);
	const [favorites, setFavorites] = useState([]);
	const [isVisibleFavorites, setIsVisibleFavorites] = useState(false);
	const wrapperRef = createRef();

	const [isLoadingAuth, fethAuth, errorAuth] = useFetching(async () => {
		const resAuthUser = await AuthorizationService.getCurrentUser();
		const authUser = await resAuthUser.json();
		
		if(resAuthUser.ok) {
			setAuthUser(authUser);
			const resFavorite = await FavoriteService.getByUserId(authUser.id);
			const resFavoriteBody = await resFavorite.json();

			if(resFavorite.ok) {
				setFavorites(resFavoriteBody);
				console.log(resFavoriteBody);
			} else {
				toast.error("Что-то пошло не так! Попробуйте перезагрузить страницу");
			}
		} else {
			console.log(authUser.message);
		}

		const resAuthSpecialist = await SpecialistService.getCurrentSpecialist();
		const resAuthSpecialistBody = await resAuthSpecialist.json();

		if(resAuthSpecialist.ok) {
			setAuthSpecialist(resAuthSpecialistBody);
		} else {
			console.log(resAuthSpecialistBody.message);
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
		<FavoriteContext.Provider value={[favorites, setFavorites, isVisibleFavorites, setIsVisibleFavorites]}>
		<UserContext.Provider value={[authUser, setAuthUser]}>
			<SpecialistContext.Provider value={[authSpecialist, setAuthSpecialist]}>
				<div className='wrapper' ref={wrapperRef}>
					<Routes>
						{publicRoutes.map(route => {
							return (
								<Route key={route.path} path={route.path} element={route.element} />
							);
						})}
						{
							authUser?.role === "user" &&
							userRoutes.map(route => {
								return (
									<Route key={route.path} path={route.path} element={route.element} />
								);
							})
						}
						{	
							authUser?.role === "specialist" &&
							specialistRoutes.map(route => {
								return (
									<Route key={route.path} path={route.path} element={route.element} />
								);
							})
						}
						{	
							authUser?.role === "admin" &&
							adminRoutes.map(route => {
								return (
									<Route key={route.path} path={route.path} element={route.element} />
								);
							})
						}
					</Routes>
					<ToastContainer
						style={{fontSize: 15}}
						autoClose={3000}
						theme={localStorage.getItem("theme") || "dark"}
					/>
				</div>
				<FavoriteModal favorites={favorites} setFavorites={setFavorites} isVisible={isVisibleFavorites} setIsVisible={setIsVisibleFavorites}/>
				<Cookie/>
			</SpecialistContext.Provider>
		</UserContext.Provider>
		</FavoriteContext.Provider>
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