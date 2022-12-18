import "./App.css";
import HomeRoute from "./HomeRoute/HomeRoute";
import { BrowserRouter } from "react-router-dom";

function App() {
	return (
		<div className='App'>
			{" "}
			<BrowserRouter>
				<HomeRoute />
			</BrowserRouter>
		</div>
	);
}

export default App;
