import { Routes, Route } from 'react-router-dom';
import HumanChecker from '@/HumanChecker/HumanChecker';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HumanChecker />} />
    </Routes>
  );
}

export default AppRoutes;