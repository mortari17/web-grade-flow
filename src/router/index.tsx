import { FdsbcPage } from "@/pages/fdsbc";
import { FiapPage } from "@/pages/fiap";
import { HomePage } from "@/pages/home";
import { createBrowserRouter } from "react-router-dom";

export const publicRouter = createBrowserRouter([
	{
		path: "/",
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/fiap",
				element: <FiapPage />,
			},
			{
				path: "/fdsbc",
				element: <FdsbcPage />,
			}
		],
	},
]);