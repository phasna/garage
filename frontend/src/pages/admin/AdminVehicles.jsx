import { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  X,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { vehiclesAPI, equipmentsAPI } from '../../services/api';
import Swal from 'sweetalert2';

const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterAvailability, setFilterAvailability] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState(getEmptyForm());

  const categories = [
    'Économique',
    'Compacte',
    'Berline',
    'SUV',
    'Électrique',
    'Luxe',
    'Utilitaire',
  ];

  const fuelTypes = ['Essence', 'Diesel', 'Hybride', 'Électrique'];
  const transmissions = ['Manuelle', 'Automatique'];

  function getEmptyForm() {
    return {
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      fuelType: 'Essence',
      transmission: 'Manuelle',
      seats: 5,
      pricePerDay: 0,
      description: '',
      imageUrl: '',
      category: 'Économique',
      isAvailable: true,
      unavailabilityReason: '',
      unavailabilityDetails: '',
      equipments: [],
    };
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterVehicles();
  }, [vehicles, searchQuery, filterCategory, filterAvailability]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [vehiclesData, equipmentsData] = await Promise.all([
        vehiclesAPI.getAllAdmin(),
        equipmentsAPI.getAllAdmin(),
      ]);
      setVehicles(vehiclesData);
      setEquipments(equipmentsData);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Impossible de charger les véhicules',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterVehicles = () => {
    let filtered = [...vehicles];

    if (searchQuery) {
      filtered = filtered.filter(
        (v) =>
          v.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter((v) => v.category === filterCategory);
    }

    if (filterAvailability !== 'all') {
      filtered = filtered.filter((v) =>
        filterAvailability === 'available' ? v.isAvailable : !v.isAvailable
      );
    }

    setFilteredVehicles(filtered);
  };

  const handleOpenModal = (vehicle = null) => {
    if (vehicle) {
      setEditingVehicle(vehicle);
      // Extraire les IDs ou IRIs des équipements
      const equipmentIds = vehicle.equipments?.map(eq => 
        typeof eq === 'string' ? eq : `/api/equipments/${eq.id}`
      ) || [];
      setFormData({
        ...vehicle,
        equipments: equipmentIds,
      });
    } else {
      setEditingVehicle(null);
      setFormData(getEmptyForm());
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingVehicle(null);
    setFormData(getEmptyForm());
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleEquipmentToggle = (equipmentId) => {
    const equipmentIri = `/api/equipments/${equipmentId}`;
    setFormData({
      ...formData,
      equipments: formData.equipments.includes(equipmentIri)
        ? formData.equipments.filter((id) => id !== equipmentIri)
        : [...formData.equipments, equipmentIri],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingVehicle) {
        await vehiclesAPI.update(editingVehicle.id, formData);
        await Swal.fire({
          icon: 'success',
          title: 'Véhicule modifié !',
          text: 'Le véhicule a été mis à jour avec succès',
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await vehiclesAPI.create(formData);
        await Swal.fire({
          icon: 'success',
          title: 'Véhicule ajouté !',
          text: 'Le véhicule a été créé avec succès',
          timer: 2000,
          showConfirmButton: false,
        });
      }
      handleCloseModal();
      loadData();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: error.message || 'Impossible de sauvegarder le véhicule',
      });
    }
  };

  const handleToggleAvailability = async (vehicle) => {
    const result = await Swal.fire({
      title: vehicle.isAvailable ? 'Marquer comme indisponible ?' : 'Marquer comme disponible ?',
      text: vehicle.isAvailable
        ? 'Le véhicule ne sera plus visible pour les clients'
        : 'Le véhicule sera à nouveau visible pour les clients',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#6366f1',
      cancelButtonColor: '#6b7280',
      input: vehicle.isAvailable ? 'text' : undefined,
      inputLabel: vehicle.isAvailable ? 'Raison (optionnel)' : undefined,
      inputPlaceholder: 'Ex: En maintenance, Réservé, etc.',
    });

    if (result.isConfirmed) {
      try {
        // result.value est un booléen (true) quand il n'y a pas d'input, sinon c'est la valeur saisie
        const reason = typeof result.value === 'string' ? result.value : '';
        await vehiclesAPI.updateAvailability(vehicle.id, {
          isAvailable: !vehicle.isAvailable,
          unavailabilityReason: reason,
        });
        await Swal.fire({
          icon: 'success',
          title: 'Statut mis à jour !',
          timer: 2000,
          showConfirmButton: false,
        });
        loadData();
      } catch (error) {
        console.error('Erreur:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de mettre à jour le statut',
        });
      }
    }
  };

  const handleDelete = async (vehicle) => {
    const result = await Swal.fire({
      title: 'Supprimer ce véhicule ?',
      text: `${vehicle.brand} ${vehicle.model} - Cette action est irréversible !`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#dc2626',
    });

    if (result.isConfirmed) {
      try {
        await vehiclesAPI.delete(vehicle.id);
        await Swal.fire({
          icon: 'success',
          title: 'Véhicule supprimé !',
          timer: 2000,
          showConfirmButton: false,
        });
        loadData();
      } catch (error) {
        console.error('Erreur:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de supprimer le véhicule',
        });
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Chargement des véhicules...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              <span className="text-gradient">Gestion des Véhicules</span>
            </h1>
            <p className="text-lg text-gray-600">
              {filteredVehicles.length} véhicule{filteredVehicles.length > 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="btn-primary flex items-center justify-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Ajouter un véhicule
          </button>
        </div>

        {/* Filters */}
        <div className="glass-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Search className="h-4 w-4 inline mr-1" />
                Rechercher
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Marque ou modèle..."
                className="modern-input"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Filter className="h-4 w-4 inline mr-1" />
                Catégorie
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="modern-input"
              >
                <option value="all">Toutes</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Disponibilité
              </label>
              <select
                value={filterAvailability}
                onChange={(e) => setFilterAvailability(e.target.value)}
                className="modern-input"
              >
                <option value="all">Tous</option>
                <option value="available">Disponibles</option>
                <option value="unavailable">Indisponibles</option>
              </select>
            </div>
          </div>
        </div>

        {/* Vehicles List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="glass-card p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={vehicle.imageUrl}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="w-full md:w-48 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {vehicle.brand} {vehicle.model}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {vehicle.year} • {vehicle.category} • {vehicle.fuelType} • {vehicle.transmission}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative group">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            vehicle.isAvailable
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700 cursor-help'
                          }`}
                        >
                          {vehicle.isAvailable ? 'Disponible' : 'Indisponible'}
                        </span>
                        {!vehicle.isAvailable && vehicle.unavailabilityReason && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                            {vehicle.unavailabilityReason}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                              <div className="border-4 border-transparent border-t-gray-900"></div>
                            </div>
                          </div>
                        )}
                      </div>
                      <span className="text-xl font-bold text-primary-600">
                        {vehicle.pricePerDay}€/j
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                    {vehicle.description}
                  </p>
                  {vehicle.equipments && vehicle.equipments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {vehicle.equipments.slice(0, 3).map((eq, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full"
                        >
                          {eq.icon} {eq.name}
                        </span>
                      ))}
                      {vehicle.equipments.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          +{vehicle.equipments.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleToggleAvailability(vehicle)}
                      className="btn-secondary text-sm py-2 px-4 flex items-center"
                    >
                      {vehicle.isAvailable ? (
                        <>
                          <EyeOff className="h-4 w-4 mr-1" />
                          Marquer indisponible
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 mr-1" />
                          Marquer disponible
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleOpenModal(vehicle)}
                      className="btn-secondary text-sm py-2 px-4 flex items-center"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle)}
                      className="text-sm py-2 px-4 rounded-xl font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors flex items-center"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVehicles.length === 0 && (
          <div className="text-center py-12 glass-card">
            <p className="text-gray-500 text-lg">
              Aucun véhicule ne correspond à vos critères
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75"
              onClick={handleCloseModal}
            ></div>

            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-gradient-to-r from-primary-600 to-purple-600 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">
                      {editingVehicle ? 'Modifier le véhicule' : 'Ajouter un véhicule'}
                    </h3>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Marque *
                      </label>
                      <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        required
                        className="modern-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Modèle *
                      </label>
                      <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        required
                        className="modern-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Année *
                      </label>
                      <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                        min="1900"
                        max={new Date().getFullYear() + 1}
                        className="modern-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Catégorie *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="modern-input"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Carburant *
                      </label>
                      <select
                        name="fuelType"
                        value={formData.fuelType}
                        onChange={handleChange}
                        required
                        className="modern-input"
                      >
                        {fuelTypes.map((fuel) => (
                          <option key={fuel} value={fuel}>
                            {fuel}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Transmission *
                      </label>
                      <select
                        name="transmission"
                        value={formData.transmission}
                        onChange={handleChange}
                        required
                        className="modern-input"
                      >
                        {transmissions.map((trans) => (
                          <option key={trans} value={trans}>
                            {trans}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Places *
                      </label>
                      <input
                        type="number"
                        name="seats"
                        value={formData.seats}
                        onChange={handleChange}
                        required
                        min="1"
                        max="50"
                        className="modern-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Prix/jour (€) *
                      </label>
                      <input
                        type="number"
                        name="pricePerDay"
                        value={formData.pricePerDay}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        className="modern-input"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        URL de l'image *
                      </label>
                      <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        required
                        className="modern-input"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="3"
                        className="modern-input"
                      ></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Équipements
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto p-3 border-2 border-gray-200 rounded-xl">
                        {equipments.map((eq) => (
                          <label
                            key={eq.id}
                            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                          >
                            <input
                              type="checkbox"
                              checked={formData.equipments.includes(`/api/equipments/${eq.id}`)}
                              onChange={() => handleEquipmentToggle(eq.id)}
                              className="rounded text-primary-600 focus:ring-primary-500"
                            />
                            <span className="text-sm">
                              {eq.icon} {eq.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isAvailable"
                          checked={formData.isAvailable}
                          onChange={handleChange}
                          className="rounded text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm font-semibold text-gray-700">
                          Véhicule disponible
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="btn-secondary"
                  >
                    Annuler
                  </button>
                  <button type="submit" className="btn-primary flex items-center">
                    <Save className="h-5 w-5 mr-2" />
                    {editingVehicle ? 'Mettre à jour' : 'Créer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminVehicles;

