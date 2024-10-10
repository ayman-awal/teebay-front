import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import MyProducts from './components/MyProducts';
import AllProducts from './components/AllProducts';
import ActivityLog from './components/ActivityLog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/activity-log" element={<ActivityLog />} />
        <Route path="/my-products" element={<MyProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
