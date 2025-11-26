import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter,
  Calendar,
  User,
  Car,
  X,
  Ban,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { rentalsAPI, vehiclesAPI } from '../../services/api';
import Swal from 'sweetalert2';

const AdminRentals = () => {
  const [rentals, setRentals] = useState([]);
  const [filteredRentals, setFilteredRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedRental, setSelectedRental] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // États pour le calendrier
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [rentalsData, vehiclesData] = await Promise.all([
        rentalsAPI.getAllAdmin(),
        vehiclesAPI.getAll(),
      ]);
      
      const sortedRentals = rentalsData.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRentals(sortedRentals);
      setVehicles(vehiclesData);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Impossible de charger les données',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    filterRentalsData();
  }, [rentals, searchQuery, filterStatus]);

  // Fonctions du calendrier
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = (firstDay.getDay() + 6) % 7; // Lundi = 0
    
    return { daysInMonth, startingDay };
  };

  const getVehicleRentalsForMonth = () => {
    if (!selectedVehicleId) return [];
    
    const selectedId = parseInt(selectedVehicleId);
    
    return rentals.filter(rental => {
      let vehicleId;
      
      if (typeof rental.vehicle === 'object' && rental.vehicle !== null) {
        // Objet avec id ou @id (IRI)
        vehicleId = rental.vehicle.id || parseInt(rental.vehicle['@id']?.split('/').pop());
      } else if (typeof rental.vehicle === 'string') {
        // IRI format: /api/vehicles/1
        vehicleId = parseInt(rental.vehicle.split('/').pop());
      } else {
        vehicleId = rental.vehicle;
      }
      
      return parseInt(vehicleId) === selectedId && rental.status === 'active';
    });
  };

  const isDateInRental = (day, rental) => {
    // Créer la date du calendrier en format YYYY-MM-DD (sans timezone)
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const calendarDateStr = `${year}-${month}-${dayStr}`;
    
    // Extraire les dates de la réservation (format YYYY-MM-DD)
    const startStr = typeof rental.startDate === 'string' 
      ? rental.startDate.split('T')[0] 
      : '';
    const endStr = typeof rental.endDate === 'string' 
      ? rental.endDate.split('T')[0] 
      : '';
    
    return calendarDateStr >= startStr && calendarDateStr <= endStr;
  };

  const getRentalForDay = (day) => {
    const vehicleRentals = getVehicleRentalsForMonth();
    return vehicleRentals.find(rental => isDateInRental(day, rental));
  };

  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  const filterRentalsData = () => {
    let filtered = [...rentals];

    if (searchQuery) {
      filtered = filtered.filter(
        (r) =>
          r.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.vehicle?.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.vehicle?.model?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter((r) => r.status === filterStatus);
    }

    setFilteredRentals(filtered);
  };

  const handleCancelRental = async (rental) => {
    const result = await Swal.fire({
      title: 'Annuler la réservation ?',
      html: `
        <div style="text-align: left;">
          <p><strong>Client:</strong> ${rental.firstName} ${rental.lastName}</p>
          <p><strong>Véhicule:</strong> ${rental.vehicle.brand} ${rental.vehicle.model}</p>
          <p><strong>Dates:</strong> ${formatDate(rental.startDate)} → ${formatDate(rental.endDate)}</p>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Oui, annuler',
      cancelButtonText: 'Non, garder',
    });

    if (result.isConfirmed) {
      try {
        await rentalsAPI.cancel(rental.id);
        await Swal.fire({
          icon: 'success',
          title: 'Réservation annulée',
          text: 'La réservation a été annulée avec succès',
          timer: 2000,
          showConfirmButton: false,
        });
        loadData();
      } catch (error) {
        console.error('Erreur lors de l\'annulation:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible d\'annuler la réservation',
        });
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const showDetails = (rental) => {
    setSelectedRental(rental);
    setShowDetailsModal(true);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Chargement des réservations...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="animate-fade-in-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            <span className="text-gradient">Réservations</span>
          </h1>
          <p className="text-lg text-gray-600">
            Gérez toutes les réservations de véhicules
          </p>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-blue-600">{rentals.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Actives</p>
                <p className="text-2xl font-bold text-green-600">
                  {rentals.filter(r => r.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Annulées</p>
                <p className="text-2xl font-bold text-red-600">
                  {rentals.filter(r => r.status === 'cancelled').length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Calendrier des réservations */}
        <div className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary-600" />
            Calendrier des réservations
          </h2>

          {/* Sélecteur de véhicule */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sélectionner un véhicule
            </label>
            <select
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
              className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">-- Choisir un véhicule --</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle.id} value={vehicle.id}>
                  {vehicle.brand} {vehicle.model} ({vehicle.year})
                </option>
              ))}
            </select>
          </div>

          {selectedVehicleId && (
            <div className="mt-4">
              {/* Navigation du mois */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <h3 className="text-lg font-semibold text-gray-900">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Grille du calendrier */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {/* En-têtes des jours */}
                <div className="grid grid-cols-7 bg-gray-50">
                  {dayNames.map((day) => (
                    <div
                      key={day}
                      className="px-2 py-3 text-center text-xs font-semibold text-gray-600 uppercase"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Jours du mois */}
                <div className="grid grid-cols-7">
                  {(() => {
                    const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);
                    const cells = [];
                    
                    // Cellules vides pour le début du mois
                    for (let i = 0; i < startingDay; i++) {
                      cells.push(
                        <div key={`empty-${i}`} className="h-12 border-t border-r border-gray-100 bg-gray-50"></div>
                      );
                    }
                    
                    // Jours du mois
                    for (let day = 1; day <= daysInMonth; day++) {
                      const rental = getRentalForDay(day);
                      const isToday = 
                        new Date().getDate() === day &&
                        new Date().getMonth() === currentMonth.getMonth() &&
                        new Date().getFullYear() === currentMonth.getFullYear();
                      
                      cells.push(
                        <div
                          key={day}
                          onClick={() => rental && showDetails(rental)}
                          className={`h-12 border-t border-r border-gray-100 flex items-center justify-center relative transition-colors ${
                            rental
                              ? 'bg-orange-100 hover:bg-orange-200 cursor-pointer'
                              : 'hover:bg-gray-50'
                          } ${isToday ? 'ring-2 ring-primary-500 ring-inset' : ''}`}
                        >
                          <span className={`text-sm ${rental ? 'font-semibold text-orange-700' : 'text-gray-700'}`}>
                            {day}
                          </span>
                          {rental && (
                            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                          )}
                        </div>
                      );
                    }
                    
                    return cells;
                  })()}
                </div>
              </div>

              {/* Légende */}
              <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-100 border border-orange-300 rounded"></div>
                  <span>Jour réservé</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-white border-2 border-primary-500 rounded"></div>
                  <span>Aujourd'hui</span>
                </div>
              </div>
            </div>
          )}

          {!selectedVehicleId && (
            <p className="text-gray-500 text-center py-8">
              Sélectionnez un véhicule pour voir son calendrier de réservations
            </p>
          )}
        </div>

        {/* Filtres et recherche */}
        <div className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Barre de recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, email ou véhicule..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Filtre statut */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actives</option>
                <option value="cancelled">Annulées</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste des réservations */}
        <div className="glass-card animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Véhicule
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRentals.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">
                        {searchQuery || filterStatus !== 'all'
                          ? 'Aucune réservation trouvée'
                          : 'Aucune réservation pour le moment'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredRentals.map((rental) => (
                    <tr key={rental.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="h-5 w-5 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {rental.firstName} {rental.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{rental.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Car className="h-5 w-5 text-gray-400 mr-2" />
                          <div className="text-sm text-gray-900">
                            {rental.vehicle?.brand} {rental.vehicle?.model}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(rental.startDate)} → {formatDate(rental.endDate)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {calculateDays(rental.startDate, rental.endDate)} jour(s)
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-primary-600">
                          {rental.totalPrice?.toFixed(2)}€
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            rental.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {rental.status === 'active' ? 'Active' : 'Annulée'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => showDetails(rental)}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Détails
                          </button>
                          {rental.status === 'active' && (
                            <button
                              onClick={() => handleCancelRental(rental)}
                              className="text-red-600 hover:text-red-800 font-medium flex items-center"
                            >
                              <Ban className="h-4 w-4 mr-1" />
                              Annuler
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal détails */}
      {showDetailsModal && selectedRental && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">
                Détails de la réservation
              </h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Informations véhicule */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Car className="h-5 w-5 mr-2 text-primary-600" />
                  Véhicule
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm">
                    <span className="font-medium">Marque & Modèle:</span>{' '}
                    {selectedRental.vehicle?.brand} {selectedRental.vehicle?.model}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Prix par jour:</span>{' '}
                    {selectedRental.vehicle?.pricePerDay}€
                  </p>
                </div>
              </div>

              {/* Informations client */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <User className="h-5 w-5 mr-2 text-primary-600" />
                  Client
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Nom:</span> {selectedRental.firstName}{' '}
                    {selectedRental.lastName}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> {selectedRental.email}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Téléphone:</span> {selectedRental.phone}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Date de naissance:</span>{' '}
                    {formatDate(selectedRental.birthDate)}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Permis:</span>{' '}
                    {selectedRental.drivingLicenseNumber}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Adresse:</span> {selectedRental.address},{' '}
                    {selectedRental.postalCode} {selectedRental.city},{' '}
                    {selectedRental.country}
                  </p>
                </div>
              </div>

              {/* Informations réservation */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary-600" />
                  Réservation
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Date de début:</span>{' '}
                    {formatDate(selectedRental.startDate)} à {selectedRental.startTime}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Date de fin:</span>{' '}
                    {formatDate(selectedRental.endDate)} à {selectedRental.endTime}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Durée:</span>{' '}
                    {calculateDays(selectedRental.startDate, selectedRental.endDate)} jour(s)
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Créée le:</span>{' '}
                    {formatDateTime(selectedRental.createdAt)}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Statut:</span>{' '}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        selectedRental.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {selectedRental.status === 'active' ? 'Active' : 'Annulée'}
                    </span>
                  </p>
                </div>
              </div>

              {/* Options */}
              {selectedRental.options && Object.keys(selectedRental.options).length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Options</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="space-y-1">
                      {selectedRental.options.additionalDriver && (
                        <li className="text-sm">✓ Conducteur supplémentaire</li>
                      )}
                      {selectedRental.options.gps && <li className="text-sm">✓ GPS</li>}
                      {selectedRental.options.childSeat && (
                        <li className="text-sm">✓ Siège enfant</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {/* Prix total */}
              <div className="bg-primary-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold text-gray-900">Prix total:</span>
                  <span className="text-lg font-bold text-primary-600">
                    {selectedRental.totalPrice?.toFixed(2)}€
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminRentals;

