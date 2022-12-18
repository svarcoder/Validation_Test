import React, { useEffect, useState } from "react";

const User = () => {
	const [useData, setUserData] = useState([]);

	useEffect(() => {
		if (!localStorage.getItem("DATA")) return;
		if (JSON.parse(localStorage.getItem("DATA").length <= 0)) return;

		var old_arr = JSON.parse(localStorage.getItem("DATA")); // array

		old_arr.forEach((val) =>
			setUserData((prevState) => [...prevState, JSON.parse(val)])
		);

		return () => setUserData([]);
	}, []);

	return (
		<div style={{ height: "100vh" }}>
			<div className='row mx-0' style={{ height: "inherit" }}>
				<div className='col-md-8 col-xs-2 p-0'>
					<div className='photo'></div>
				</div>
				<div className='col-md-4 col-xs-10'>
					<div className='welcome'>
						<h3>User's Email</h3>
					</div>
					<div className='section'>
						<div className='normal'>
							{useData && useData.map((item, i) => <p key={i}>{item.email}</p>)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default User;
