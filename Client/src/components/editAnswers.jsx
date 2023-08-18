import axios from "axios"
import { useNavigate, useParams } from "react-router-dom";
import inputsJSON from "../utils/greydive.json";
import { useEffect, useState } from "react";
import { getAnswers, editAnswers } from "../redux/actions";
import { useDispatch } from "react-redux";

const EditAnswers = () => {
  const { id } = useParams()

  const dispatch = useDispatch();
	const navigate = useNavigate();

  const [userAnswers, setUserAnswers] = useState({
		full_name: "",
		email: "",
		birth_date: "",
		country_of_origin: "",
		terms_and_conditions: "",
		userId: id,
  });

  const [userAnswersCopy, setUserAnswersCopy] = useState({
		full_name: "",
		email: "",
		birth_date: "",
		country_of_origin: "",
		terms_and_conditions: "",
		userId: id,
  });

  const handleSubmit = async (event) => {
		event.preventDefault();
		try {
      const response = await dispatch(editAnswers(userAnswers));
      console.log(response);
      navigate(`/answers/${id}`);
		} catch (error) {
			if(error.message === "Network Error") return setErrorCatched("Connection lost.")
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
  
  useEffect(() => {
		try {
			axios.get(`http://localhost:3001/answers?userId=${id}`).then(({ data }) => {
				if (data.answersDB?.full_name) {
          setUserAnswers(data.answersDB)
          setUserAnswersCopy(data.answersDB)
				}
			});
		} catch (error) {
			console.log(error);
		}
		return setUserAnswers({});
	}, []);

	return (
		<main className="h-screen w-screen bg-slate-800 flex flex-col justify-center items-center">
      <section className="flex flex-col text-white/90 text-center text-xl font-serif">
        <p>The information that we currently have is:</p>
        <p className="text-base">Complete name: { userAnswersCopy?.full_name }</p>
        <p className="text-base">Email: { userAnswersCopy?.email }</p>
        <p className="text-base">Birthdate: { userAnswersCopy?.birth_date }</p>
        <p className="text-base">Country: {userAnswersCopy.country_of_origin}</p>
      </section>
      <form onSubmit={handleSubmit} className="h-3/4 flex flex-col justify-around text-white/90 font-serif">
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
export default EditAnswers;
