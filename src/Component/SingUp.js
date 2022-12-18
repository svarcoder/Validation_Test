import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SingUp = () => {
	const history = useHistory();

	const [userDetails, setUserDetails] = useState({
		name: "",
		mobile: "",
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({
		name: false,
		mobile: false,
		email: false,
		password: false,
	});

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
			name: false,
			mobile: false,
			email: false,
			password: false,
		});
		for (let i in userDetails) {
			if (i === "name" && !userDetails[i].match(/^[a-z\s]+/gi)) {
				setErrors((prevState) => ({
					...prevState,
					[i]: true,
				}));
				flag = true;
			}
			if (
				(i === "mobile" && !userDetails[i].match(/^[0-9\b]+$/gi)) ||
				(i === "mobile" && userDetails[i].length !== 10)
			) {
				setErrors((prevState) => ({
					...prevState,
					[i]: true,
				}));
				flag = true;
			}

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
			onSingUp(e);
		}
	};

	const onSingUp = (e) => {
		e.preventDefault();

		let temp = userDetails;
		temp.email = temp.email.toLowerCase();

		if (JSON.parse(localStorage.getItem("DATA") === null)) {
			localStorage.setItem("DATA", JSON.stringify([]));
		}
		var old_arr = JSON.parse(localStorage.getItem("DATA"));
		old_arr.push(JSON.stringify(userDetails));
		localStorage.setItem("DATA", JSON.stringify(old_arr));

		history.push("/");
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
							<h5>Please singup to your account.</h5>
						</div>
						<div className='section'>
							<div className='normal'>
								<form>
									<div className='form-group'>
										{errors.name && (
											<label style={{ color: "red" }}>
												Enter Your Right Name
											</label>
										)}
										<input
											type='email'
											className='form-control'
											id='name'
											aria-describedby='emailHelp'
											placeholder='Name'
											value={userDetails.name}
											onChange={handelChange}
											autocomplete='off'
											style={errors.name ? { border: "1px solid red" } : {}}
										/>
									</div>
									<div className='form-group'>
										{errors.mobile && (
											<label style={{ color: "red" }}>
												Enter Your Right Mobile
											</label>
										)}
										<input
											type='email'
											className='form-control'
											id='mobile'
											aria-describedby='emailHelp'
											placeholder='Mobile'
											value={userDetails.mobile}
											onChange={handelChange}
											autocomplete='off'
											style={errors.mobile ? { border: "1px solid red" } : {}}
										/>
									</div>
									<div className='form-group'>
										{errors.email && (
											<label style={{ color: "red" }}>
												Enter Your Right Email
											</label>
										)}
										<input
											type='email'
											className='form-control'
											id='email'
											aria-describedby='emailHelp'
											placeholder='Email id'
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
										Singup
									</button>
									<a href='/'>Log in?</a>
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

export default SingUp;
