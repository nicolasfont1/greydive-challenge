import FactCheckIcon from "@mui/icons-material/FactCheck";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [userData, setUserData] = useState({
		name: ""
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await dispatch(registerUser(userData))
			navigate("/")
		} catch (error) {
			window.alert(error.response.data)
		}
	};

	const handleChange = (event) => {
		setUserData({
			...userData,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<main className="h-screen w-screen bg-slate-800 flex flex-col justify-center items-center">
			<section className="h-1/2 text-white/90 font-serif text-5xl text-center flex flex-col justify-center">
				<span className="mt-10">I know, everybody hates this,</span>
				<span>but it will take only a few seconds</span>
				<span className="text-xl text-center mt-7">Names must be uniques, think it well</span>
				<span className="text-sm text-center">
					or you can{" "}
					<a href="/" className="underline">
						go back
					</a>
				</span>
			</section>
			<section className="h-1/2 w-full text-white/90 font-serif flex flex-col">
				<form onSubmit={handleSubmit} className="flex flex-row justify-center h-full w-full relative">
					<div className="flex flex-col justify-center gap-4">
						<label htmlFor="name" className="font-serif text-white/90 text-xl">
							Name
							<input
								type="text"
								id="name"
								name="name"
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								placeholder="Your name"
								autoComplete="off"
								onChange={handleChange}
							/>
						</label>
						<button
							className="hover:scale-110 transition-all text-white rounded py-1 px-3 mt-7 absolute right-[29%]"
							type="button"
							onClick={handleSubmit}>
							<FactCheckIcon style={{ fontSize: "48px" }} />
						</button>
					</div>
				</form>
			</section>
		</main>
	);
};
export default Register;
