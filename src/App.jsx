import { HumanCheckerProvider } from '@/contexts/HumanCheckerContext';
import { HashRouter } from 'react-router-dom';
import AppRoutes from '@/routes/AppRoutes';

function App() {
  return (
    <HumanCheckerProvider>
    	<HashRouter>
      	<AppRoutes />
    	</HashRouter>
    </HumanCheckerProvider>
  );
}

export default App;