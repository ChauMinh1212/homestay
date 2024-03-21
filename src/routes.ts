import AboutPage from "./pages/AboutPage/AboutPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import EventPage from "./pages/EventPage/EventPage";
import HomePage from "./pages/HomePage/HomePage";
import HomestayPage from "./pages/HomestayPage/HomestayPage";
import ServicePage from "./pages/ServicePage/ServicePage";

const routes = [
    { path: '/', element: HomePage },
    { path: '/about', element: AboutPage },
    { path: '/homestay', element: HomestayPage },
    { path: '/service', element: ServicePage },
    { path: '/event', element: EventPage },
    { path: '/shop', element: EventPage },
    { path: '/contact', element: ContactPage }
]

export default routes