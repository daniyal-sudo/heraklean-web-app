import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { api_url } from "../../../CommonFunctions";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			const response = await axios.post(`${api_url}login`, { email, password });

			if (response.data.success) {
				localStorage.setItem("token", response.data.token);
				localStorage.setItem("trainerId", response.data.trainer.id);
				navigate("/"); // Redirect after successful login
			}
		} catch (error) {
			setError(error.response?.data?.message || "An error occurred during login");
		}
	};

	return (
		<div className="container-fluid">
			<div className="row">
			<div className="col-lg-12 d-md-none text-center pb-3">
					<img src="/image 45.png" className="small_screen_image_width" alt="Logo" />
				</div>
			</div>

			<div className="row login-section">
				<div className="col-lg-6 d-flex justify-content-center align-items-center login-screen">
					<div className="header-desktop">
						<div className="text-center d-lg-block">
								<img src="/image 45.png" alt="Logo" className="logo-img" />
							</div>
						</div>
						
					<div className="col-lg-7 content-login">
						<h3 className="mb-3 text-black text-center text-lg-start">Login</h3>
						<p className="mb-4 text-center text-lg-start">Access back to your account</p>

						<form onSubmit={handleSubmit} noValidate>
							<div className="form-group mb-3">
								<div className="input-group">
									<div className="input-group-prepend">
										<span className="input-group-text icon_back">
											<i className="bi bi-envelope login_icon_color"></i>
										</span>
									</div>
									<input
										type="email"
										className="form-control login_input_field"
										id="email"
										placeholder="Email Address"
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>
							</div>
							<div className="form-group mb-3">
								<div className="input-group">
									<div className="input-group-prepend">
										<span className="input-group-text icon_back">
											<i className="bi bi-lock login_icon_color"></i>
										</span>
									</div>
									<input
										type="password"
										className="form-control login_input_field"
										id="password"
										placeholder="Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</div>
							</div>
							<div className="text-end mb-3">
								<Link to="/forgot-password" className="text-decoration-none text-black">
									Forgot Password?
								</Link>
							</div>
							<button type="submit" className="login_button w-100">Login</button>
							{error && (
								<div className="alert alert-danger mt-3 text-center" role="alert">
									{error}
								</div>
							)}
							<div className="text-center mt-4">
								<span>
									New User ?{" "}
									<Link to="/registration" style={{ fontWeight: "500" }} className="text-decoration-none text-black account-resigter">
										Register Account
									</Link>
								</span>
							</div>
							<div className="line-separator my-4">
								<div className="line"></div>
								<span className="fw-bold text-black">Or Login with</span>
								<div className="line"></div>
							</div>
							<div className="row text-center   flex-row d-flex justify-content-center align-items-center">
								<div className="col-2">
									<img src="/fb_login_logo.png" alt="Facebook Login" className="social-icon" />
								</div>
								<div className="col-2">
									<img src="/google-login-logo.png" alt="Google Login" className="social-icon" />
								</div>
							</div>
						</form>
					</div>
				
				</div>
				<div className="col-lg-6 login_image_container">
					<div className="login_image"></div>
				</div>
			</div>
		</div>
	);
};

export default Login;

