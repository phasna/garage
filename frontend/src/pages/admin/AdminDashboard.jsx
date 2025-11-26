import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Car, Wrench, CheckCircle, XCircle, TrendingUp, ArrowRight, Calendar } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { vehiclesAPI, equipmentsAPI, rentalsAPI } from '../../services/api';
import Swal from 'sweetalert2';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    availableVehicles: 0,
    unavailableVehicles: 0,
    totalEquipments: 0,
    activeRentals: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentVehicles, setRecentVehicles] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [vehicles, equipments, rentals] = await Promise.all([
        vehiclesAPI.getAllAdmin(),
        equipmentsAPI.getAllAdmin(),
        rentalsAPI.getAllAdmin(),
      ]);

      const available = vehicles.filter(v => v.isAvailable).length;
      const unavailable = vehicles.filter(v => !v.isAvailable).length;
      const activeRentals = rentals.filter(r => r.status === 'active').length;

      setStats({
        totalVehicles: vehicles.length,
        availableVehicles: available,
        unavailableVehicles: unavailable,
        totalEquipments: equipments.length,
        activeRentals: activeRentals,
      });

      // Prendre les 5 derniers véhicules
      setRecentVehicles(vehicles.slice(0, 5));
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Impossible de charger les données du dashboard',
      });
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, link }) => (
    <Link
      to={link}
      className="glass-card p-6 hover:scale-105 transition-all duration-300 group"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color.replace('text-', 'from-')}-100 ${color.replace('text-', 'to-')}-200 flex items-center justify-center group-hover:rotate-12 transition-transform`}>
          <Icon className={`h-7 w-7 ${color}`} />
        </div>
      </div>
      <div className="flex items-center text-sm text-gray-600 group-hover:text-primary-600 transition-colors">
        <span>Voir les détails</span>
        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Chargement des données...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            <span className="text-gradient">Dashboard</span>
          </h1>
          <p className="text-lg text-gray-600">
            Vue d'ensemble de votre garage
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <StatCard
            title="Total Véhicules"
            value={stats.totalVehicles}
            icon={Car}
            color="text-blue-600"
            link="/admin/vehicles"
          />
          <StatCard
            title="Disponibles"
            value={stats.availableVehicles}
            icon={CheckCircle}
            color="text-green-600"
            link="/admin/vehicles"
          />
          <StatCard
            title="Indisponibles"
            value={stats.unavailableVehicles}
            icon={XCircle}
            color="text-red-600"
            link="/admin/vehicles"
          />
          <StatCard
            title="Réservations"
            value={stats.activeRentals}
            icon={Calendar}
            color="text-orange-600"
            link="/admin/rentals"
          />
          <StatCard
            title="Équipements"
            value={stats.totalEquipments}
            icon={Wrench}
            color="text-purple-600"
            link="/admin/equipments"
          />
        </div>

        {/* Quick Actions */}
        <div className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-primary-600" />
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/admin/vehicles"
              className="p-4 rounded-xl border-2 border-gray-200 hover:border-primary-500 hover:bg-primary-50 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600">
                    Gérer les véhicules
                  </h3>
                  <p className="text-sm text-gray-600">
                    Ajouter, modifier ou supprimer des véhicules
                  </p>
                </div>
                <Car className="h-8 w-8 text-gray-400 group-hover:text-primary-600 transition-colors" />
              </div>
            </Link>
            <Link
              to="/admin/rentals"
              className="p-4 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-orange-600">
                    Voir les réservations
                  </h3>
                  <p className="text-sm text-gray-600">
                    Consulter et gérer les réservations
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-gray-400 group-hover:text-orange-600 transition-colors" />
              </div>
            </Link>
            <Link
              to="/admin/equipments"
              className="p-4 rounded-xl border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-600">
                    Gérer les équipements
                  </h3>
                  <p className="text-sm text-gray-600">
                    Ajouter, modifier ou supprimer des équipements
                  </p>
                </div>
                <Wrench className="h-8 w-8 text-gray-400 group-hover:text-purple-600 transition-colors" />
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Vehicles */}
        {recentVehicles.length > 0 && (
          <div className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Car className="h-6 w-6 mr-2 text-primary-600" />
                Véhicules récents
              </h2>
              <Link
                to="/admin/vehicles"
                className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center"
              >
                Voir tout
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/50 hover:bg-white/80 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={vehicle.imageUrl}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {vehicle.brand} {vehicle.model}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {vehicle.year} • {vehicle.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold text-primary-600">
                      {vehicle.pricePerDay}€/jour
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        vehicle.isAvailable
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {vehicle.isAvailable ? 'Disponible' : 'Indisponible'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

