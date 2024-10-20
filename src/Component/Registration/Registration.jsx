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
		profilePic: null, // Will hold the selected image file
	});

	const [message, setMessage] = useState("");

	// Handle text input changes
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Handle image file selection
	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			setFormData({ ...formData, profilePic: file });
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Create FormData object for multipart/form-data request
		const form = new FormData();
		form.append("Fname", formData.Fname);
		form.append("lastName", formData.lastName);
		form.append("email", formData.email);
		form.append("password", formData.password);
		form.append("location", formData.location);
		form.append("title", formData.title);
		if (formData.profilePic) {
			form.append("profilePic", formData.profilePic); // Add the image file to the form data
		}

		try {
			const response = await axios.post("http://localhost:5001/api/auth/register", form, {
				headers: {
					"Content-Type": "multipart/form-data", // Set the correct header for file uploads
				},
			});
			setMessage(response.data.message);
			// Store the token if returned and redirect after a delay
			localStorage.setItem("token", response.data.token);
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} catch (error) {
			setMessage(error.response?.data?.message || "An error occurred");
		}
	};

	return (
		<>
			<div className="container-fluid vh-100">
				<div className="row">
					<div className="col-lg-12 d-md-none">
						<div class="text-center pb-3">
							<img src="/image 45.png" className="small_screen_image_width" alt="Logo" />
						</div>
					</div>
				</div>
				<div className="row h-100">
					<div className="col-lg-6 col-md-12 col-sm-12 align-self-center order-1 order-lg-0">
						<div class="logo-container d-none d-md-block">
							<img src="/image 45.png" alt="Logo" />
						</div>
						<div className="row justify-content-center align-self-center">
							<div className="col-lg-9">
								<h3 className="mb-3 text-black">Register</h3>
								<p className="mb-4">Create a new account</p>
								<form onSubmit={handleSubmit} noValidate>
									<div className="row">
										<div className="col-lg-12 col-sm-12">
											<div className="form-group mb-3">
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
										<div className="col-lg-6 col-sm-12">
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
										<div className="col-lg-6 col-sm-12">
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
										<div className="col-lg-6 col-sm-12">
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
										<div className="col-lg-6 col-sm-12">
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
										<div className="col-lg-6 col-sm-12">
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
										<div className="col-lg-6 col-sm-12">
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
										<div className="col-lg-12 col-sm-12">
											<button type="submit" className="login_button w-100 mt-3">
												Register
											</button>
											{message && <div className="alert alert-info mt-3">{message}</div>}
										</div>
									</div>

									<div className="text-center mt-4">
										<span>
											Already a User ?{" "}
											<Link to="/Login" style={{ fontWeight: "500" }} className="text-decoration-none text-black">
												Login
											</Link>
										</span>
									</div>
								</form>
							</div>
						</div>
					</div>

					<div className="col-lg-6 col-md-12 col-sm-12 order-0 order-lg-1 small_screen_padding">
						<div className="registration_screen_small"></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Registration;
