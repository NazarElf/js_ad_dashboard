import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Dashboard, { loader as dashboardLoader } from './pages/Dashboard';
import About from './pages/About';
import Error from './pages/Error';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'
      element={<Nav />}
      errorElement={<Error />}>
      <Route errorElement={<Error />}>
        <Route index element={<Home />}></Route>
        <Route path="/dashboard" element={<Dashboard />} loader={dashboardLoader}></Route>
        <Route path="/about" element={<About />}></Route>
      </Route>
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App;
