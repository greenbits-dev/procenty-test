import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ProgressProvider } from './context/ProgressContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Tutorial } from './pages/Tutorial';
import { Practice } from './pages/Practice';
import { Test } from './pages/Test';

function App() {
    return (
        <ThemeProvider>
            <ProgressProvider>
                <BrowserRouter>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/tutorial" element={<Tutorial />} />
                            <Route path="/practice" element={<Practice />} />
                            <Route path="/test" element={<Test />} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </ProgressProvider>
        </ThemeProvider>
    );
}

export default App;
