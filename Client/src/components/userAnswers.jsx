import axios from "axios";
import { getAnswers } from "../redux/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UserAnswers = () => {
	const dispatch = useDispatch();
	const { id } = useParams();

	const [userAnswers, setUserAnswers] = useState({});

	useEffect(() => {
		try {
			axios.get(`http://localhost:3001/answers?userId=${id}`).then(({ data }) => {
				if (data.answersDB?.full_name) {
					let country = data.answersDB?.country_of_origin;
					let [firstLetter, ...completeWord] = country;
					let formattedCountry = firstLetter.toUpperCase() + completeWord.join("");
					data.answersDB.country_of_origin = formattedCountry;
					setUserAnswers(data.answersDB);
				}
			});
		} catch (error) {
			console.log(error);
		}
		return setUserAnswers({});
	}, []);

	return (
		<main className="h-screen w-screen bg-slate-800 flex flex-col justify-center items-center">
			<section className="h-[45%] flex flex-col justify-center items-center">
				<h1 className="text-7xl text-white/90 font-serif">Stealed information:</h1>
			</section>
			<section className="h-[55%] font-serif text-white/90 text-2xl text-center flex flex-col justify-start gap-3">
				<p>
					Your complete name is <span className="text-gray-400">{userAnswers?.full_name}</span>,
				</p>
				<p>
					with <span className="text-gray-400">{userAnswers?.email}</span> as email,
				</p>
				<p>
					born on <span className="text-gray-400">{userAnswers?.birth_date}</span>,
				</p>
				<p>
					in the beatiful country of <span className="text-gray-400">{userAnswers.country_of_origin}</span>.
				</p>
				<h1 className="text-base text-white/90 font-serif mt-14">
					Something is wrong? Help us to improve our database just{" "}
					<a href={`/answers/edit/${id}`} className="text-sm text-white/90 font-serif underline">
						clicking here!
					</a>
				</h1>
				<div className="flex justify-center">
					<a href="/" className="hover:scale-110 hover:underline transition-all text-sm mt-6">
						Log out
					</a>
				</div>
			</section>
		</main>
	);
};
export default UserAnswers;
