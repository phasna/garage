import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, KeyRound, ArrowLeft, LogIn, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

// Composant InputField défini en dehors pour éviter les re-renders
const InputField = ({ icon: Icon, id, name, type, value, onChange, placeholder, label, minLength }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-bold text-white mb-2 drop-shadow">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-primary-500" />
      </div>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full pl-12 pr-4 py-3 bg-white/95 border-2 border-white/50 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:border-white focus:bg-white transition-all duration-300 shadow-lg"
        placeholder={placeholder}
        minLength={minLength}
      />
    </div>
  </div>
);

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, forgotPassword, resetPassword, isAuthenticated } = useAuth();
  
  const [mode, setMode] = useState('login'); // 'login', 'forgot', 'reset'
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    garageCode: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [verifiedUsername, setVerifiedUsername] = useState('');

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(formData.username, formData.password);
      
      if (result.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Connexion réussie !',
          text: 'Bienvenue dans l\'espace administrateur',
          timer: 2000,
          showConfirmButton: false,
        });
        navigate('/admin/dashboard');
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Erreur de connexion',
          text: result.error || 'Identifiants incorrects',
        });
      }
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de la connexion',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await forgotPassword(formData.username, formData.garageCode);
      
      if (result.success) {
        setVerifiedUsername(formData.username);
        setMode('reset');
        await Swal.fire({
          icon: 'success',
          title: 'Code garage vérifié !',
          text: 'Vous pouvez maintenant réinitialiser votre mot de passe',
        });
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: result.error || 'Code garage invalide',
        });
      }
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Les mots de passe ne correspondent pas',
      });
      return;
    }

    if (formData.newPassword.length < 6) {
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Le mot de passe doit contenir au moins 6 caractères',
      });
      return;
    }

    setLoading(true);

    try {
      const result = await resetPassword(
        verifiedUsername,
        formData.garageCode,
        formData.newPassword
      );
      
      if (result.success) {
        await Swal.fire({
          icon: 'success',
          title: 'Mot de passe réinitialisé !',
          text: 'Vous pouvez maintenant vous connecter avec votre nouveau mot de passe',
        });
        setMode('login');
        setFormData({
          username: verifiedUsername,
          password: '',
          garageCode: '',
          newPassword: '',
          confirmPassword: '',
        });
        setVerifiedUsername('');
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: result.error || 'Impossible de réinitialiser le mot de passe',
        });
      }
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-5">
      <InputField
        icon={User}
        id="username"
        name="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        placeholder="Votre nom d'utilisateur"
        label="Nom d'utilisateur"
      />

      <InputField
        icon={Lock}
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Votre mot de passe"
        label="Mot de passe"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary h-12 text-lg disabled:opacity-50 disabled:cursor-not-allowed justify-center"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
            Connexion...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <LogIn className="h-5 w-5 mr-2" />
            Se connecter
          </span>
        )}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setMode('forgot')}
          className="text-sm text-white/80 hover:text-white font-semibold transition-colors underline underline-offset-2"
        >
          Mot de passe oublié ?
        </button>
      </div>
    </form>
  );

  const renderForgotPasswordForm = () => (
    <form onSubmit={handleForgotPassword} className="space-y-5">
      <div className="mb-4 p-3 bg-white/20 border border-white/30 rounded-xl backdrop-blur-sm">
        <p className="text-sm text-white/90">
          Pour réinitialiser votre mot de passe, entrez votre nom d'utilisateur et le code garage.
        </p>
      </div>

      <InputField
        icon={User}
        id="forgot-username"
        name="username"
        type="text"
        value={formData.username}
        onChange={handleChange}
        placeholder="Votre nom d'utilisateur"
        label="Nom d'utilisateur"
      />

      <InputField
        icon={KeyRound}
        id="garageCode"
        name="garageCode"
        type="text"
        value={formData.garageCode}
        onChange={handleChange}
        placeholder="Code du garage"
        label="Code garage"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary h-12 text-lg disabled:opacity-50 disabled:cursor-not-allowed justify-center"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
            Vérification...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 mr-2" />
            Vérifier
          </span>
        )}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setMode('login')}
          className="text-sm text-white/80 hover:text-white font-semibold transition-colors flex items-center justify-center mx-auto"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour à la connexion
        </button>
      </div>
    </form>
  );

  const renderResetPasswordForm = () => (
    <form onSubmit={handleResetPassword} className="space-y-5">
      <div className="mb-4 p-3 bg-white/20 border border-white/30 rounded-xl backdrop-blur-sm">
        <p className="text-sm text-white/90">
          Entrez votre nouveau mot de passe pour l'utilisateur <strong className="text-white">{verifiedUsername}</strong>.
        </p>
      </div>

      <InputField
        icon={Lock}
        id="newPassword"
        name="newPassword"
        type="password"
        value={formData.newPassword}
        onChange={handleChange}
        placeholder="Nouveau mot de passe"
        label="Nouveau mot de passe"
        minLength={6}
      />

      <InputField
        icon={Lock}
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirmer le mot de passe"
        label="Confirmation"
        minLength={6}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary h-12 text-lg disabled:opacity-50 disabled:cursor-not-allowed justify-center"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
            Réinitialisation...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <ShieldCheck className="h-5 w-5 mr-2" />
            Réinitialiser le mot de passe
          </span>
        )}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => {
            setMode('login');
            setVerifiedUsername('');
          }}
          className="text-sm text-white/80 hover:text-white font-semibold transition-colors flex items-center justify-center mx-auto"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour à la connexion
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen modern-gradient flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="max-w-md w-full relative z-10">
        <div className="glass-card p-8 md:p-10 animate-scale-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 mb-5 shadow-2xl">
              <ShieldCheck className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              {mode === 'login' && 'Espace Administrateur'}
              {mode === 'forgot' && 'Mot de passe oublié'}
              {mode === 'reset' && 'Réinitialiser le mot de passe'}
            </h2>
            <p className="text-white/90 text-lg drop-shadow">
              {mode === 'login' && 'Connectez-vous pour gérer votre garage'}
              {mode === 'forgot' && 'Récupérez l\'accès à votre compte'}
              {mode === 'reset' && 'Définissez un nouveau mot de passe'}
            </p>
          </div>

          {/* Forms */}
          <div>
            {mode === 'login' && renderLoginForm()}
            {mode === 'forgot' && renderForgotPasswordForm()}
            {mode === 'reset' && renderResetPasswordForm()}
          </div>

          {/* Footer */}
          {mode === 'login' && (
            <div className="mt-6 text-center">
              <a
                href="/"
                className="text-sm text-white/90 hover:text-white transition-colors inline-flex items-center drop-shadow"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Retour au site
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
