import React from 'react';
import { useSessionStore } from '../store/session';

export default function AppPage() {
  const { accessToken, refreshToken, expiresIn } = useSessionStore();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Hello World</h2>
      <p className="mt-4 text-gray-600 dark:text-gray-300">You are logged in.</p>
      <section aria-label="Session summary" className="mt-8 p-4 bg-gray-200 dark:bg-gray-800 rounded shadow max-w-xl w-full">
        <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Session Info</h3>
        <ul className="text-gray-800 dark:text-gray-100 text-sm">
          <li><strong>Access token:</strong> {accessToken ? 'Present' : 'Missing'}</li>
          <li><strong>Expires in:</strong> {expiresIn ? `${expiresIn} seconds` : 'N/A'}</li>
        </ul>
      </section>
      {import.meta.env.DEV && (
        <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900 rounded shadow max-w-xl w-full">
          <h4 className="font-semibold mb-2 text-yellow-800 dark:text-yellow-200">Debug Info (Dev Only)</h4>
          <pre className="text-xs text-yellow-900 dark:text-yellow-100 overflow-x-auto">
{JSON.stringify({ accessToken, refreshToken, expiresIn }, null, 2)}
          </pre>
        </div>
      )}
      <button
        className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded focus:outline-none focus:ring-2 focus:ring-red-400"
        onClick={() => {
          useSessionStore.getState().clearSession();
          window.location.replace('/login');
        }}
        aria-label="Logout and clear session"
      >
        Logout
      </button>
    </main>
  );
}
