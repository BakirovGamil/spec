import Authorization from "../pages/Authorization/Authorization";
import Finder from "../pages/Finder/Finder";
import Login from "../pages/Login/Login";
import Main from "../pages/Main";
import Messages from "../pages/Messages/Messages";
import NotFound from "../pages/NotFound/NotFound";
import ProfileComments from "../pages/ProfileComments/ProfileComments";
import ProfileId from "../pages/ProfileId/ProfileId";
import ProfilePhotos from "../pages/ProfilePhotos/ProfilePhotos";
import SpecialistGallery from "../pages/SpecialistGallery/SpecialistGallery";
import SpecialistProfile from "../pages/SpecialistProfile/SpecialistProfile";
import SpecialistRegistration from "../pages/SpecialistRegistration/SpecialistRegistration";
import Moderation from "../pages/Moderation/Moderation";
import MySubscriptions from "../pages/MySubscriptions/MySubscriptions";
import Orders from "../pages/Orders/Orders";
import MainSubscriptions from "../pages/MainSubscriptions/MainSubscriptions";

export const publicRoutes = [
    {path: "*", element: <NotFound/>},
    {path: "/", element: <Main/>},
    {path: 'profile/:specialistId', element: <ProfileId />},
    {path: 'profile/photos/:specialistId', element: <ProfilePhotos />},
    {path: 'profile/comments/:specialistId', element: <ProfileComments />},
    {path: 'authorization', element: <Authorization />},
    {path: 'login', element: <Login />},
    {path: 'search', element: <Finder />},
    {path: 'search/:query', element: <Finder />},
    {path: 'mainsubs', element: <MainSubscriptions />}
];

export const userRoutes = [
    {path: 'messages/:userId', element: <Messages />},
    {path: 'specialist/registration', element: <SpecialistRegistration />},
    {path: 'subscriptions', element: <MySubscriptions />}
];

export const specialistRoutes = [
    {path: 'messages/:userId', element: <Messages />},
    {path: 'specialist/profile', element: <SpecialistProfile />},
    {path: 'specialist/gallery', element: <SpecialistGallery />},
    {path: 'subscriptions', element: <MySubscriptions />},
    {path: 'orders', element: <Orders />}
]

export const adminRoutes = [
    {path: 'messages/:userId', element: <Messages />},
    {path: 'moderation', element: <Moderation />}
]