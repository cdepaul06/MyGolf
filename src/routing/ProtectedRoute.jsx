import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

export default function ProtectedRoute({ component: Component, ...args }) {
  const Guarded = withAuthenticationRequired(Component, {
    onRedirecting: () => <div style={{ padding: 24 }}>Redirecting...</div>,
  });

  return <Guarded {...args} />;
}
