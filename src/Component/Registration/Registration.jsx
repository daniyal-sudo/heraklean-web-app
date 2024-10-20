import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./registration.css";

const Registration = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		Fname: "",
		lastName: "",
		email: "",
		password: "",
		location: "",
		title: "",
		profilePic: null,
	});

	const [message, setMessage] = useState("");

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			setFormData({ ...formData, profilePic: file });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const form = new FormData();
		for (const key in formData) {
			form.append(key, formData[key]);
		}

		try {
			const response = await axios.post("http://localhost:5001/api/auth/register", form, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			setMessage(response.data.message);
			localStorage.setItem("token", response.data.token);
			setTimeout(() => navigate("/login"), 2000);
		} catch (error) {
			setMessage(error.response?.data?.message || "An error occurred");
		}
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-lg-6 col-md-12 align-self-center">
					<div className="text-center">
						<div className="d-flex justify-content-start flex-column">
							<div className="header-desktop">
								<img src="/image 45.png" alt="Logo" className="logo-img" />
								</div>
						</div>
				
							<form onSubmit={handleSubmit} noValidate  className="register-from">
								<div className="col-lg-7">
											<div className="register-content">
													<h3 className="mb-3">Register</h3>
													<p className="mb-4 text-start">Create a new account</p>
											</div>
								</div>
								<div className="col-lg-7">
									<div className="form-group mb-3 choose_file">
															<div className="input-group">
																<input
																	type="file"
																	name="Fname"
																	placeholder="Full Name"
																	className="form-control py-1"
																	onChange={handleChange}
																/>
															</div>
									</div>
								</div>
								<div className="col-lg-7">
									<div className="form-group mb-3 d-none d-md-block">
															<div className="input-group">
																<div className="input-group-prepend">
																	<span className="input-group-text icon_back">
																		<i className="bi bi-person login_icon_color"></i>
																	</span>
																</div>
																<input
																	type="text"
																	name="Fname"
																	placeholder="First Name"
																	className="form-control login_input_field"
																	onChange={handleChange}
																/>
															</div>
									</div>
								</div>
								<div className="col-lg-7">
									<div className="form-group mb-3">
															<div className="input-group">
																<div className="input-group-prepend">
																	<span className="input-group-text icon_back">
																		<i className="bi bi-person login_icon_color"></i>
																	</span>
																</div>
																<input
																	type="text"
																	name="Fname"
																	placeholder="Last Name"
																	className="form-control login_input_field"
																	onChange={handleChange}
																/>
															</div>
									</div>
								</div>
								<div className="col-lg-7">
									<div className="form-group mb-3">
															<div className="input-group">
																<div className="input-group-prepend ">
																	<span className="input-group-text icon_back">
																		<i className="bi bi-envelope login_icon_color"></i>
																	</span>
																</div>
																<input
																	type="text"
																	name="email"
																	placeholder="Email Address"
																	className="form-control login_input_field"
																	onChange={handleChange}
																/>
															</div>
									</div>
								</div>
								<div className="col-lg-7">
													<div className="form-group mb-3">
														<div className="input-group">
															<div className="input-group-prepend ">
																<span className="input-group-text icon_back">
																	<i className="bi bi-lock login_icon_color"></i>
																</span>
															</div>
															<input
																type="text"
																name="password"
																placeholder="Password"
																className="form-control login_input_field"
																onChange={handleChange}
															/>
														</div>
													</div>
								</div>
								<div className="col-lg-7">
													<div className="form-group mb-3 d-none d-md-block">
														<div className="input-group">
															<div className="input-group-prepend ">
																<span className="input-group-text icon_back">
																	<i className="bi bi-geo-alt login_icon_color"></i>
																</span>
															</div>
															<input
																type="text"
																name="location"
																placeholder="Location"
																className="form-control login_input_field"
																onChange={handleChange}
															/>
														</div>
													</div>
								</div>
								<div className="col-lg-7">
									<div className="form-group mb-3 d-none d-md-block">
										<div className="input-group">
											<div className="input-group-prepend ">
												<span className="input-group-text icon_back">
													<i className="bi bi-calendar2-range-fill login_icon_color"></i>
												</span>
											</div>
											<input
												type="text"
												name="location"
												placeholder="Title"
												className="form-control login_input_field"
												onChange={handleChange}
											/>
										</div>
									</div>
								</div>
								<div className="col-lg-7">
										<button type="submit" className="login_button w-100">
											Register
										</button>
										{message && <div className="alert alert-info mt-3">{message}</div>}
								</div>
							</form>
					
							<div className="text-center mt-4">
								<span>
									Already a User?{" "}
									<Link to="/login" className="text-decoration-none custom-text">
										Login
									</Link>
								</span>
							</div>
					</div>
				</div>
				<div className="col-lg-6 registration_screen_small"></div>
			</div>
		</div>
	);
};

export default Registration;

