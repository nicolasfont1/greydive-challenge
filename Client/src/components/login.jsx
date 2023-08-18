import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser, getAnswers } from "../redux/actions";
import { Alert } from "../components/alert";

const Login = () => {
	const [userData, setUserData] = useState({
		name: "",
	});

	const [errorCatched, setErrorCatched] = useState(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		setErrorCatched(null);
		try {
			if (!userData.name) {
				return setErrorCatched("Better try writing something!")
			}

			const response = await dispatch(getUser(userData.name))

			if (response === "Non registered name.") {
				setUserData({name: ""})
				return setErrorCatched(response)
			}

			const answers = await dispatch(getAnswers(response))
			if (answers === "No answers.") {
				return navigate(`/greydive/${response}`)
			}
			navigate(`/answers/${response}`)
		} catch (error) {
			if(error.message === "Network Error") return setErrorCatched("Connection lost.")
			return console.log(error.message)
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
			{errorCatched && <Alert alertTitle={"Error!"} alertBody={errorCatched} setErrorCatched={setErrorCatched} />}
			<section className="h-[60%] flex flex-col justify-center text-center">
				<h1 className="text-4xl text-white/90 font-serif">THE</h1>
				<h1 className="text-9xl text-white/90 font-serif font-extrabold">GREYDIVE</h1>
				<h1 className="text-6xl text-white/90 font-serif mt-3">CHALLENGE</h1>
			</section>
			<section className="h-[40%] w-1/3 flex flex-col justify-center gap-5">
				<form onSubmit={handleSubmit}>
					<label htmlFor="name" className="font-serif text-white/90 text-xl">
						Name
						<input
							type="text"
							id="name"
							name="name"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Your name"
							autoComplete="off"
							value={userData.name}
							onChange={handleChange}
						/>
					</label>
					<div className="w-full flex justify-center">
						<button
							className="hover:bg-slate-900 hover:scale-110 transition-all text-white rounded py-1 px-3 mt-4"
							type="button"
							onClick={handleSubmit}>
							<LockOpenOutlinedIcon />
						</button>
					</div>
				</form>
				<span className="text-white/90 text-center">
					First time?{" "}
					<a href="/register" className="underline">
						register here
					</a>
				</span>
			</section>
		</main>
	);
};
export default Login;
