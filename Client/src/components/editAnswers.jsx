import axios from "axios"
import { useNavigate, useParams } from "react-router-dom";
import inputsJSON from "../utils/greydive.json";
import { useEffect, useState } from "react";
import { editAnswers } from "../redux/actions";
import { useDispatch } from "react-redux";
import { Alert } from "../components/alert";

const EditAnswers = () => {
  const { id } = useParams()

  const dispatch = useDispatch();
	const navigate = useNavigate();

	const [alert, setAlert] = useState(null);

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
		setAlert(null);
		try {
			if (userAnswers.terms_and_conditions === false) {
				return setAlert("Can't save without accept terms.")
			}
      const response = await dispatch(editAnswers(userAnswers));
      setAlert(response);
			setTimeout(() => {
				navigate(`/answers/${id}`);
			}, 3000);
		} catch (error) {
			if(error.message === "Network Error") return setAlert("Connection lost.")
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
					setUserAnswers(data.answersDB);
					let country = data.answersDB?.country_of_origin;
					let [firstLetter, ...completeWord] = country;
					let formattedCountry = firstLetter.toUpperCase() + completeWord.join("");
					data.answersDB.country_of_origin = formattedCountry
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
			{alert && <Alert alertTitle={"Error!"} alertBody={alert} setAlert={setAlert} />}
      <section className="h-[35%] flex flex-col justify-center text-white/90 text-center font-serif gap-1">
        <p className="text-4xl">The information that we currently have is:</p>
        <p className="text-xl">Complete name: <span className="text-gray-400">{ userAnswersCopy?.full_name }</span></p>
        <p className="text-xl">Email: <span className="text-gray-400">{ userAnswersCopy?.email }</span></p>
        <p className="text-xl">Birthdate: <span className="text-gray-400">{ userAnswersCopy?.birth_date }</span></p>
				<p className="text-xl">Country: <span className="text-gray-400">{userAnswersCopy.country_of_origin}</span></p>
			</section>
			<p className="text-sm font text-white/90">(Empty or untouched fields wont be affected)</p>
      <form onSubmit={handleSubmit} className="h-[65%] flex flex-col justify-center gap-4 text-white/90 font-serif">
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
									placeholder={item.type === "text" ? userAnswersCopy.full_name : userAnswersCopy.email}
									defaultValue={item.type === "text" ? userAnswersCopy.full_name : item.type === "email" ? userAnswersCopy.email : userAnswersCopy.birth_date}
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
									defaultValue={userAnswersCopy.country_of_origin}
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
								<input type={item.type} name={item.name} required={item.required} defaultChecked={true} onChange={handleChange} className="ml-4 w-4 hover:cursor-pointer"/>
							</label>
						);
					} else {
						return (
							<div className="flex justify-around" key={index}>
								<a href={`/answers/${id}`} className="text-white/60 hover:cursor-pointer hover:scale-110 hover:underline transition-all hover:text-white/90">Volver</a>
								<button type={item.type} onClick={handleSubmit} className="hover:cursor-pointer hover:scale-110 hover:underline transition-all">
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
