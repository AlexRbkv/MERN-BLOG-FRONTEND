import { useEffect } from 'react';
import Container from '@mui/material/Container';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Header } from './components';
import { fetchAuthMe } from './redux/slices/authSlice';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import FilterByTag from './pages/FIlterByTag';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/tags/:tag" element={<FilterByTag />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
