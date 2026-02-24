import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

const NavbarComponent = () => {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" variant="small" className="p-1 font-normal">
        <a href="#">Pages</a>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-normal">
        <a href="#">Account</a>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-normal">
        <a href="#">Blocks</a>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-normal">
        <a href="#">Docs</a>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography as="a" href="#" className="mr-4 cursor-pointer py-1.5 font-medium">
          CardiYo
        </Typography>

        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>

          <div className="flex items-center gap-x-1">
            <Button variant="text" size="sm" className="hidden lg:inline-block">
              Log In
            </Button>
            <Button variant="gradient" size="sm" className="hidden lg:inline-block">
              Sign In
            </Button>
          </div>

          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </IconButton>
        </div>
      </div>

      <MobileNav open={openNav}>
        {navList}
        <div className="flex items-center gap-x-1">
          <Button fullWidth variant="text" size="sm">
            Log In
          </Button>
          <Button fullWidth variant="gradient" size="sm">
            Sign In
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
};

export default NavbarComponent;