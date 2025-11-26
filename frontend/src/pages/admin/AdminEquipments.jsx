import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { equipmentsAPI } from '../../services/api';
import Swal from 'sweetalert2';

const AdminEquipments = () => {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [formData, setFormData] = useState(getEmptyForm());

  function getEmptyForm() {
    return {
      name: '',
      code: '',
      icon: '🔧',
    };
  }

  useEffect(() => {
    loadEquipments();
  }, []);

  const loadEquipments = async () => {
    setLoading(true);
    try {
      const data = await equipmentsAPI.getAllAdmin();
      setEquipments(data);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Impossible de charger les équipements',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (equipment = null) => {
    if (equipment) {
      setEditingEquipment(equipment);
      setFormData({
        name: equipment.name,
        code: equipment.code,
        icon: equipment.icon,
      });
    } else {
      setEditingEquipment(null);
      setFormData(getEmptyForm());
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEquipment(null);
    setFormData(getEmptyForm());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingEquipment) {
        await equipmentsAPI.update(editingEquipment.id, formData);
        await Swal.fire({
          icon: 'success',
          title: 'Équipement modifié !',
          text: 'L\'équipement a été mis à jour avec succès',
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await equipmentsAPI.create(formData);
        await Swal.fire({
          icon: 'success',
          title: 'Équipement ajouté !',
          text: 'L\'équipement a été créé avec succès',
          timer: 2000,
          showConfirmButton: false,
        });
      }
      handleCloseModal();
      loadEquipments();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: error.message || 'Impossible de sauvegarder l\'équipement',
      });
    }
  };

  const handleDelete = async (equipment) => {
    const result = await Swal.fire({
      title: 'Supprimer cet équipement ?',
      text: `${equipment.name} - Cette action est irréversible !`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#dc2626',
    });

    if (result.isConfirmed) {
      try {
        await equipmentsAPI.delete(equipment.id);
        await Swal.fire({
          icon: 'success',
          title: 'Équipement supprimé !',
          timer: 2000,
          showConfirmButton: false,
        });
        loadEquipments();
      } catch (error) {
        console.error('Erreur:', error);
        await Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Impossible de supprimer l\'équipement. Il est peut-être utilisé par des véhicules.',
        });
      }
    }
  };

  // Suggestions d'icônes
  const iconSuggestions = [
    '🔧', '⚡', '📍', '📷', '📡', '☀️', '🔥', '📺',
    '👁️', '🚪', '🚦', '🔑', '📱', '🧳', '🎵', '💺',
    '🌡️', '🔌', '📻', '🎥', '🛡️', '⚙️', '🔋', '💨'
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Chargement des équipements...</p>
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
              <span className="text-gradient">Gestion des Équipements</span>
            </h1>
            <p className="text-lg text-gray-600">
              {equipments.length} équipement{equipments.length > 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="btn-primary flex items-center justify-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Ajouter un équipement
          </button>
        </div>

        {/* Equipments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {equipments.map((equipment) => (
            <div
              key={equipment.id}
              className="glass-card p-6 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-purple-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {equipment.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {equipment.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-mono">
                      {equipment.code}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(equipment)}
                  className="flex-1 btn-secondary text-sm py-2 px-3 flex items-center justify-center"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(equipment)}
                  className="text-sm py-2 px-3 rounded-xl font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>

        {equipments.length === 0 && (
          <div className="text-center py-12 glass-card">
            <p className="text-gray-500 text-lg">
              Aucun équipement pour le moment
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

            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-gradient-to-r from-primary-600 to-purple-600 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">
                      {editingEquipment ? 'Modifier l\'équipement' : 'Ajouter un équipement'}
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

                <div className="px-6 py-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom de l'équipement *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Ex: GPS, Caméra de recul..."
                      className="modern-input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Code *
                    </label>
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      required
                      placeholder="Ex: gps, camera_recul..."
                      className="modern-input"
                      pattern="[a-z0-9_]+"
                      title="Uniquement des lettres minuscules, chiffres et underscores"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Utilisez uniquement des lettres minuscules, chiffres et underscores
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Icône * (sélectionnez ou tapez un emoji)
                    </label>
                    <div className="flex items-center space-x-2 mb-3">
                      <input
                        type="text"
                        name="icon"
                        value={formData.icon}
                        onChange={handleChange}
                        required
                        maxLength="2"
                        className="modern-input w-20 text-center text-2xl"
                      />
                      <span className="text-sm text-gray-600">
                        Aperçu: <span className="text-2xl">{formData.icon}</span>
                      </span>
                    </div>
                    
                    <div className="border-2 border-gray-200 rounded-xl p-3">
                      <p className="text-xs text-gray-600 mb-2">Suggestions :</p>
                      <div className="grid grid-cols-8 gap-2">
                        {iconSuggestions.map((icon, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setFormData({ ...formData, icon })}
                            className={`text-2xl p-2 rounded-lg hover:bg-primary-100 transition-colors ${
                              formData.icon === icon ? 'bg-primary-100 ring-2 ring-primary-500' : 'bg-gray-50'
                            }`}
                          >
                            {icon}
                          </button>
                        ))}
                      </div>
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
                    {editingEquipment ? 'Mettre à jour' : 'Créer'}
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

export default AdminEquipments;

