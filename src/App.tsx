import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, SeatSelection, Travel } from './components';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Travel />} />
          <Route path="/seat-selection" element={<SeatSelection />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;