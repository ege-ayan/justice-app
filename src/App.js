import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PasswordInput from './PasswordInput';
import Calculator from './Calculator';

const App = () => {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" exact element={<PasswordInput/>} />
        <Route path="/calculator" element={<Calculator/>} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
