import { useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import Button from "@mui/material/Button";

const LandingPage = () => {
  const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

  const handleSignup = useCallback(async () => {
    await loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: "openid profile email",
      },
    });
  }, [loginWithRedirect]);

  const handleLogin = useCallback(async () => {
    await loginWithRedirect({
      authorizationParams: {
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: "openid profile email",
      },
    });
  }, [loginWithRedirect]);

  if (isLoading) {
    return (
      <div className='bg-green-50 min-w-screen min-h-screen flex items-center justify-center'>
        <div>Loading...</div>
      </div>
    );
  }

  // ✅ If authenticated, go into the protected app shell route
  if (isAuthenticated) {
    return <Navigate to='/app/dashboard' replace />;
  }

  return (
    <div className='bg-green-50 min-w-screen min-h-screen relative'>
      <div className='absolute top-0 right-0 p-4 flex justify-end gap-2'>
        <Button variant='outlined' color='success' onClick={handleLogin}>
          Log In
        </Button>
      </div>

      <div className='min-h-screen flex flex-col justify-center items-center text-center px-4'>
        <h1 className='text-green-600 font-bold text-4xl mb-4'>
          Welcome to MyGolf
        </h1>

        <p className='mb-6 max-w-xl'>
          Your ultimate golf companion app to track your scores, analyze your
          game, and improve your skills on the course.
        </p>

        <Button variant='contained' color='success' onClick={handleSignup}>
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
