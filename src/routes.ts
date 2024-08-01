import NotFound from "./components/NotFound/NotFound";
import AboutPage from "./pages/AboutPage/AboutPage";
import AdminBookingPage from "./pages/Admin/AdminBookingPage";
import AdminRoomPage from "./pages/Admin/AdminRoomPage";
import AdminSetting from "./pages/Admin/AdminSetting";
import AdminUserPage from "./pages/Admin/AdminUserPage";
import HomePage from "./pages/HomePage/HomePage";
import HomestayPage from "./pages/HomestayPage/HomestayPage";
import RoomDetail from "./pages/RoomDetail/RoomDetail";
import ServicePage from "./pages/ServicePage/ServicePage";

const routes = [
  { path: "/", element: HomePage },
  { path: "/about", element: AboutPage },
  { path: "/homestay", element: HomestayPage },
  { path: "/service", element: ServicePage },
  { path: "/event", element: NotFound },
  { path: "/shop", element: NotFound },
  { path: "/contact", element: NotFound },

  //Admin   
  { path: "/admin/room", element: AdminRoomPage },
  { path: "/admin/user", element: AdminUserPage },
  { path: "/admin/setting", element: AdminSetting },
  { path: "/admin/create-booking", element: AdminBookingPage },

  //Room detail
  { path: "/room/:roomCode/:roomId", element: RoomDetail }
];

export default routes;
