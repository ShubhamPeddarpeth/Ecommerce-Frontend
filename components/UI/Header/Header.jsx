'use client';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsCart } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { Button, Offcanvas, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import './header.css';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../../src/reducer/userReducer';
import NavCategory from './NavCategory';
import { fetchCategory } from '../../../src/reducer/categoryReducer';
import withAuth from '../../withAuth';
const Header = () => {
  const [color, setColor] = useState(false);
  const [show, setShow] = useState(false);
  const { push } = useRouter();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategory());
    }
  }, [dispatch, categories]);

  const changeTextColor = () => {
    if (window.scrollY >= 90) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeTextColor);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to logout ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,logout',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(signOut());
        push('/signIn');
      }
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Navbar
        sticky="top"
        collapseOnSelect
        expand="lg"
        className=""
        id={color ? "header-bg" : "header"}
      >
        <Container>
          <Navbar.Brand href="/#">
            <div className="flex items-center text-[1vmax] mr-3 ">
              <p
                id={color ? "header-text" : "header"}
                className="text-[2vmax] pl-2 sm:text-[2vmax] md:text-[3vmax] lg:text-[1.7vmax]  text-[#33080A] m-0"
              >
                Ecommerce Store
              </p>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle
            className="bg-white"
            aria-controls="responsive-navbar-nav"
          />

          <Navbar.Collapse className="text-center " id="responsive-navbar-nav">
            <Nav className="me-auto ">
              {categories?.map((cate) => {
                return <NavCategory  category={cate} />;
              })}
            </Nav>
            <Nav className="items-center">
              {user && (
                <NavDropdown
                  className={color ? "header-text" : "header"}
                  id={color ? "header-text" : "header"}
                  title={user.firstName}
                  menuVariant="dark"
                >
                  <Nav.Link
                    className=" text-white ml-3"
                    id={color ? "header-text" : "header"}
                    onClick={handleLogout}
                  >
                    Log Out
                  </Nav.Link>
                  <Nav.Link
                    className=" text-white ml-3"
                    id={color ? "header-text" : "header"}
                    href="/myOrder"
                  >
                    My Orders
                  </Nav.Link>
                </NavDropdown>
              )}

            {!user && (
              <Nav.Link
                className={color ? 'header-text' : 'header'}
                id={color ? 'header-text' : 'header'}
                href="/signIn"
              >
                LogIn
              </Nav.Link>
            )}

            {user.role === 'admin' && (
              <>
                <Nav.Link
                  className={color ? 'header-text' : 'header'}
                  id={color ? 'header-text' : 'header'}
                  onClick={handleShow}
                >
                  Dashboard
                </Nav.Link>

                <Offcanvas show={show} onHide={handleClose}>
                  <Offcanvas.Header closeButton></Offcanvas.Header>
                  <Offcanvas.Body>
                    <Button
                      className="w-full"
                      variant="light"
                      size="lg"
                      onClick={() => {
                        handleClose();
                        push('/addCategory');
                      }}
                    >
                      Add Category
                    </Button>
                    <Button
                      className="w-full mt-3"
                      variant="light"
                      size="lg"
                      onClick={() => {
                        handleClose();
                        push('/addProduct');
                      }}
                    >
                      Add Products
                    </Button>{' '}
                    <Button
                      className="w-full mt-3"
                      variant="light"
                      size="lg"
                      onClick={() => {
                        handleClose();
                        push('/orders');
                      }}
                    >
                      Orders
                    </Button>
                  </Offcanvas.Body>
                </Offcanvas>
              </>
            )}

            <Nav.Link
              className="text-black mr-3"
              id={color ? 'header-text' : 'header'}
              href="/cart"
            >
              <BsCart />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default withAuth(Header);
