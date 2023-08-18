import inputsJSON from "../utils/greydive.json";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postAnswers } from "../redux/actions";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "../components/alert";

const Form = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { id } = useParams()

	const [userAnswers, setUserAnswers] = useState({
		full_name: "",
		email: "",
		birth_date: "",
		country_of_origin: "",
		terms_and_conditions: false,
		userId: id,
	});

	const [errorCatched, setErrorCatched] = useState(null);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setErrorCatched(null);
		try {
			const response = await dispatch(postAnswers(userAnswers));
			if (response === "Data missing.") {
				return setErrorCatched(response)
			}
			setErrorCatched(response)
			setTimeout(() => {
				navigate(`/answers/${id}`);
			}, 3000);
		} catch (error) {
			if (error.response.data) return setErrorCatched(error.response.data.error)
			if(error.message === "Network Error") return setErrorCatched("Connection lost.")
		}
	};

	const handleChange = (event) => {
		if (event.target.type === "checkbox") {
			return setUserAnswers({
				...userAnswers,
				[event.target.name]: event.target.checked,
			});
		}
		setUserAnswers({
			...userAnswers,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<main className="h-screen w-screen bg-slate-800 flex flex-col justify-center items-center text-white">
			{errorCatched && <Alert alertTitle={"Error!"} alertBody={errorCatched} setErrorCatched={setErrorCatched} />}
			<section className="h-[35%] flex justify-center items-center">
				<span className="text-6xl font-serif">It's time for some spanglish!</span>
			</section>
			<form onSubmit={handleSubmit} className="h-[65%] flex flex-col gap-4 font-serif">
				{inputsJSON.items.map((item, index) => {
					if (item.type === "text" || item.type === "email" || item.type === "date") {
						return (
							<label htmlFor={item.name} key={index}>
								{item.label}
								<input
									type={item.type}
									name={item.name}
									required={item.required}
									onChange={handleChange}
									autoComplete="off"
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								/>
							</label>
						);
					} else if (item.type === "select") {
						return (
							<label htmlFor={item.name} key={index}>
								{item.label}
								<select
									name={item.name}
									required={item.required}
									key={index}
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									defaultValue="Choose"
									onChange={handleChange}>
									<option value="Choose" disabled>
										Ver países
									</option>
									{item.options.map((option, index) => {
										return (
											<option value={option.value} key={index}>
												{option.label}
											</option>
										);
									})}
								</select>
							</label>
						);
					} else if (item.type === "checkbox") {
						return (
							<label htmlFor={item.name} key={index} className="flex justify-center">
								{item.label}
								<input type={item.type} name={item.name} required={item.required} onChange={handleChange} className="ml-4 w-4 hover:cursor-pointer"/>
							</label>
						);
					} else {
						return (
							<div className="flex justify-center" key={index}>
								<button type={item.type} onClick={handleSubmit} className="w-fit hover:cursor-pointer hover:scale-110 hover:underline transition-all">
									{item.label}
								</button>
							</div>
						);
					}
				})}
			</form>
		</main>
	);
};
export default Form;
