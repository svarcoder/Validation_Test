import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
	const history = useHistory();

	const [userDetails, setUserDetails] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({
		email: false,
		password: false,
	});

	const [dataFetchError, setDataFetchError] = useState(false);

	const handelChange = (e) => {
		setUserDetails({
			...userDetails,
			[e.target.id]: e.target.value,
		});
	};

	const HandleValidation = (e) => {
		e.preventDefault();
		let flag = false;
		setErrors({
			email: false,
			password: false,
		});
		setDataFetchError(false);
		for (let i in userDetails) {
			if (
				i === "email" &&
				!userDetails[i].match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/gi
				)
			) {
				setErrors((prevState) => ({
					...prevState,
					[i]: true,
				}));
				flag = true;
			}
			if (
				i === "password" &&
				!userDetails[i].match(
					/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gi
				)
			) {
				setErrors((prevState) => ({
					...prevState,
					[i]: true,
				}));
				flag = true;
			}
		}
		if (!flag) {
			onLogIn(e);
		}
	};

	const onLogIn = (e) => {
		e.preventDefault();
		let tempData = [];

		if (!localStorage.getItem("DATA")) return setDataFetchError(true);

		var old_arr = JSON.parse(localStorage.getItem("DATA"));

		if (old_arr.length <= 0) return setDataFetchError(true);

		old_arr.forEach((val) => tempData.push(JSON.parse(val)));

		let findData = tempData.find(
			(value) =>
				value.email === userDetails.email.toLowerCase() &&
				value.password === userDetails.password
		);

		if (!findData) return setDataFetchError(true);

		history.push("/user");
	};

	return (
		<>
			<div>
				<div className='row mx-0'>
					<div className='col-md-8 col-xs-2 p-0'>
						<div className='photo'></div>
					</div>
					<div className='col-md-4 col-xs-10'>
						<div className='welcome'>
							<h3>Welcome back!</h3>
							<h5>Please login to your account.</h5>
						</div>
						<div className='section'>
							<div className='normal'>
								<form>
									<div className='form-group'>
										{errors.email && (
											<label style={{ color: "red" }}>
												Enter Your Right Email
											</label>
										)}
										{dataFetchError && (
											<label style={{ color: "red" }}>
												Enter Your Right Email & Right Password
											</label>
										)}
										<input
											type='email'
											className='form-control'
											id='email'
											aria-describedby='emailHelp'
											placeholder='Username'
											value={userDetails.email}
											onChange={handelChange}
											autocomplete='off'
											style={errors.email ? { border: "1px solid red" } : {}}
										/>
									</div>
									<div className='form-group'>
										{errors.password && (
											<label style={{ color: "red" }}>
												Password is Minimum Eight Characters, <br />
												One Uppercase Letter, One Lowercase Letter <br />
												and One Number
											</label>
										)}
										<input
											type='password'
											className='form-control'
											id='password'
											placeholder='Password'
											value={userDetails.password}
											onChange={handelChange}
											autocomplete='off'
											style={errors.password ? { border: "1px solid red" } : {}}
										/>
									</div>
									<div className='form-group form-check '>
										<div>
											<input
												type='checkbox'
												className='form-check-input'
												id='exampleCheck1'
											/>
											<label
												className='form-check-label'
												htmlFor='exampleCheck1'>
												Remember me
											</label>
										</div>
										<a href='/'>Forgot Password</a>
									</div>
									<button
										type='submit'
										className='button'
										onClick={(e) => HandleValidation(e)}>
										Login
									</button>
									<a href='/singup'>Forgot Password?</a>
								</form>
							</div>
						</div>

						<p className='footer'>Terms of use.Privacy policy</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
