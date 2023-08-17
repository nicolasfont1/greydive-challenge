import inputsJSON from "../utils/greydive.json";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postAnswers } from "../redux/actions";
import { useNavigate, useParams } from "react-router-dom";

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

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await dispatch(postAnswers(userAnswers));
			console.log(response);
			navigate(`/answers/${id}`);
		} catch (error) {
			return error;
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
			<section className="h-1/4 flex justify-center items-center">
				<span>Spanglish</span>
			</section>
			<form onSubmit={handleSubmit} className="h-3/4 flex flex-col justify-around">
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
							<label htmlFor={item.name} key={index}>
								{item.label}
								<input type={item.type} name={item.name} required={item.required} onChange={handleChange} />
							</label>
						);
					} else {
						return (
							<button type={item.type} key={index} onClick={handleSubmit}>
								{item.label}
							</button>
						);
					}
				})}
			</form>
		</main>
	);
};
export default Form;
