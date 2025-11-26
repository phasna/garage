import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Car, 
  Wrench, 
  LogOut, 
  Menu, 
  X,
  Home,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Déconnexion',
      text: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui, me déconnecter',
      cancelButtonText: 'Annuler',
      reverseButtons: false,
    });

    if (result.isConfirmed) {
      logout();
      navigate('/admin');
      await Swal.fire({
        icon: 'success',
        title: 'Déconnecté',
        text: 'À bientôt !',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Véhicules',
      href: '/admin/vehicles',
      icon: Car,
    },
    {
      name: 'Équipements',
      href: '/admin/equipments',
      icon: Wrench,
    },
    {
      name: 'Réservations',
      href: '/admin/rentals',
      icon: Calendar,
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-primary-600 to-purple-600">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Mon garage</h2>
                <p className="text-xs text-white/80">{user?.username || 'Administrateur'}</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <Link
              to="/"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span>Retour au site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-30 bg-white shadow-md">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
            <div className="w-10"></div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

