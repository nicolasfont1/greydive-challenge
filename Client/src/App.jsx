import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Form from "./components/form"
import UserAnswers from "./components/userAnswers"
import EditAnswers from "./components/editAnswers";

const App = () => {
	return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/greydive/:id' element={<Form />} />
        <Route path='/answers/:id' element={<UserAnswers />} />
        <Route path='/answers/edit/:id' element={<EditAnswers />} />
      </Routes>
    </div>
	);
};
export default App;
