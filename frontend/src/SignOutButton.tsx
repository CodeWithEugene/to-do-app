import { useAuth } from "./contexts/AuthContext";

export function SignOutButton() {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button
      className="px-4 py-2 rounded-lg transition-colors bg-blue-500 text-white hover:bg-blue-600"
      onClick={logout}
    >
      Sign out
    </button>
  );
}