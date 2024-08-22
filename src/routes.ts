import NotFound from "./components/NotFound/NotFound";
import AboutPage from "./pages/AboutPage/AboutPage";
import AdminBookingPage from "./pages/Admin/AdminBookingPage";
import AdminEventPage from "./pages/Admin/AdminEventPage";
import AdminRoomPage from "./pages/Admin/AdminRoomPage";
import AdminSetting from "./pages/Admin/AdminSetting";
import AdminUserPage from "./pages/Admin/AdminUserPage";
import EventPage from "./pages/EventPage/EventPage";
import HomePage from "./pages/HomePage/HomePage";
import HomestayPage from "./pages/HomestayPage/HomestayPage";
import RoomDetail from "./pages/RoomDetail/RoomDetail";
import ServicePage from "./pages/ServicePage/ServicePage";

const routes = [
  { path: "/", element: HomePage },
  { path: "/about", element: AboutPage },
  { path: "/homestay", element: HomestayPage },
  { path: "/service", element: ServicePage },
  { path: "/event", element: EventPage },
  { path: "/shop", element: NotFound },
  { path: "/contact", element: NotFound },

  //Admin   
  { path: "/admin/room", element: AdminRoomPage },
  { path: "/admin/user", element: AdminUserPage },
  { path: "/admin/setting", element: AdminSetting },
  { path: "/admin/create-booking", element: AdminBookingPage },
  { path: "/admin/event", element: AdminEventPage },

  //Room detail
  { path: "/room/:roomCode/:roomId", element: RoomDetail }
];

export default routes;
