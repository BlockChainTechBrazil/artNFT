// src/pages/LoginPage.tsx
import { useState } from 'react';
import { WalletIcon, UserIcon } from '../components/Icons';
import { useApp } from '../context/AppContext';

export const LoginPage = ({ navigate }: { navigate: (path: string) => void }) => {
  const { connectWallet, web3Status, loading, user, setUser, accounts } = useApp();
  const [loginType, setLoginType] = useState('social');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSocialLogin = async (provider: string) => {
    try {
      console.log('Fazendo login com ' + provider);
      setUser({ 
        id: provider + '-user-123', 
        name: 'Usuário ' + provider, 
        email: (email || provider.toLowerCase() + '@example.com'), 
        profileImage: 'https://via.placeholder.com/40' 
      });
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer login com ' + provider + ':', error);
      alert('Erro ao fazer login. Tente novamente.');
    }
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) return;
    // TODO: Implementar login com Firebase Auth
    setUser({ id: 'email-user', name: email.split('@')[0], email });
    navigate('/');
  };

  if (user) { 
    navigate('/'); 
    return null; 
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Faça login na sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Conecte-se usando sua wallet ou login social
          </p>
        </div>

        <div className="bg-white rounded-lg shadow px-8 py-6">
          <div className="flex space-x-1 rounded-lg bg-gray-100 p-1 mb-6">
            <button 
              onClick={() => setLoginType('social')} 
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${loginType === 'social' ? 'bg-white shadow' : ''}`}
            >
              <UserIcon className="inline-block w-4 h-4 mr-2" /> Social
            </button>
            <button 
              onClick={() => setLoginType('wallet')} 
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${loginType === 'wallet' ? 'bg-white shadow' : ''}`}
            >
              <WalletIcon className="inline-block w-4 h-4 mr-2" /> Wallet
            </button>
          </div>

          {loginType === 'social' ? (
            <div className="space-y-4">
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="seu@email.com" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Senha</label>
                  <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="********" 
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Entrar com Email
                </button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Ou continue com</span>
                </div>
              </div>

              <div className="space-y-2">
                <button 
                  onClick={() => handleSocialLogin('Google')} 
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                >
                  Login com Google
                </button>
                <button 
                  onClick={() => handleSocialLogin('Facebook')} 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                >
                  Login com Facebook
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <button 
                onClick={connectWallet} 
                disabled={loading} 
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors"
              >
                <WalletIcon className="inline-block w-5 h-5 mr-2" /> 
                {loading ? 'Conectando...' : 'Conectar MetaMask'}
              </button>

              <div className="mt-4 text-center p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-700">Status: <span className="font-semibold">{web3Status}</span></p>
                {accounts.length > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    Conta: {accounts[0].slice(0, 6)}...{accounts[0].slice(-4)}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
