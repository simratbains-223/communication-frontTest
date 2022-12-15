import { Outlet, Link } from "react-router-dom";

export default function Menu() {
  return (
    <>
      <nav className='Menu'>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/chat'>Chat</Link>
      </nav>
      <Outlet />
    </>
  );
}
