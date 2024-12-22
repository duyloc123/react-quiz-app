import { Route, Routes } from 'react-router-dom';

import { MainLayout } from "./layouts/main-layout";

import { Dashboard } from './pages/dashboard';
import { Question } from './pages/question';
import { FinalScore } from './pages/final-score';
import { Leaderboard } from './pages/leaderboard';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="/question" element={<MainLayout><Question /></MainLayout>} />
        <Route path="/final-score" element={<MainLayout><FinalScore /></MainLayout>} />
        <Route path="/leaderboard" element={<MainLayout><Leaderboard /></MainLayout>} />
      </Routes>
    </>
  )
}

export default App
