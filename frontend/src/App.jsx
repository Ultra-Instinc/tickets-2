import { BrowserRouter as Router } from "react-router-dom";
import RoutesWithAnimation from "./components/animation/RoutesWithAnimation";
import { Toaster } from "react-hot-toast";
export default function App() {
	return (
		<div className='w-[90%] mx-auto '>
			<Router>
				<RoutesWithAnimation />
			</Router>
			<Toaster />
		</div>
	);
}
