import { BrowserRouter , Routes, Route } from 'react-router-dom';
import FishList from './components/fish/FishList';
import FishDetails from './components/fish/FishDetails';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<FishList />} />
          <Route path="/fish/:id" element={<FishDetails />} />
        </Routes>  
    </BrowserRouter>
  );
};

export default App;