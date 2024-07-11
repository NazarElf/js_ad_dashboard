import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Nav from './Nav';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'
      element={<Nav/>}
      errorElement={<div><p>err</p></div>}>
      <Route errorElement={<div><p>fallback err</p></div>}>
        <Route index element={<div><h1>Home</h1></div>}></Route>
        <Route path="/dashboard" element={<div><p>Dashboard</p></div>}></Route>
        <Route path="/about" element={<div><p>About</p></div>}></Route>
      </Route>
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App;
