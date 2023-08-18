import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

export const Alert = ({ alertBody, setAlert }) => {
	return (
		<div
			className="w-1/4 bg-slate-100 border border-slate-400 text-slate-700 pr-4 rounded absolute top-4 expandable flex flex-row justify-between items-center z-50"
			role="alert">
			<div className="bg-slate-400 w-1/6 h-12 flex items-center justify-center">
				<strong>
					<PriorityHighIcon />
				</strong>
			</div>
			<span className="block font-serif">{alertBody}</span>
			<span onClick={() => setAlert(null)}>
				<svg
					className="fill-current h-6 w-6 ml-1 text-slate-500"
					role="button"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20">
					<title>Cerrar</title>
					<path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
				</svg>
			</span>
		</div>
	);
};
