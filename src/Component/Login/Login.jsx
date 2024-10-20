import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		try {
			const response = await axios.post("http://82.112.240.94:5001/api/auth/login", { email, password });

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
		<div className="container-fluid vh-100">
			<div className="row">
				<div className="col-lg-12 d-md-none ">
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
						<div className="col-lg-7">
							<h3 className="mb-3 text-black">Login</h3>
							<p className="mb-4">Access back to your account</p>
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
										<div className="input-group-prepend ">
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
								<div className="text-end">
									<Link to="/forgot-password" className="text-decoration-none text-black">
										Forgot Password?
									</Link>
								</div>
								<button type="submit" className="login_button w-100 mt-3">
									Login
								</button>
								{/* <button type="submit" className="login_button w-100 mt-3">
									Login
								</button> */}
								{error && (
									<div className="alert alert-danger mt-3 text-center" role="alert">
										{error}
									</div>
								)}

								<div className="text-center mt-4">
									<span>
										New User ?{" "}
										<Link to="/registration" style={{ fontWeight: "500" }} className="text-decoration-none text-black">
											Register Account
										</Link>
									</span>
								</div>

								<div class="line-separator">
									<div class="line"></div>
									<span className="fw-bold text-black">Or Login with</span>
									<div class="line"></div>
								</div>
							</form>
						</div>
						<div className="row">
							<div className="col-6">
								<div className="text-end mt-4">
									<img src="/fb_login_logo.png" alt="Google Login" style={{ width: "30px", cursor: "pointer" }} />
								</div>
							</div>
							<div className="col-6">
								<div className="text-start mt-4">
									<img src="/google-login-logo.png" alt="Google Login" style={{ width: "30px", cursor: "pointer" }} />
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="col-lg-6 col-md-12 col-sm-12 order-0 order-lg-1 small_screen_padding">
					<div className="login_screen_small"></div>
				</div>
			</div>
		</div>
	);
};

export default Login;
