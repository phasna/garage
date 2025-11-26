// Configuration de l'API
const API_BASE_URL = 'http://localhost:8000/api';

// Gestion du token JWT
const getToken = () => localStorage.getItem('jwt_token');
const setToken = (token) => localStorage.setItem('jwt_token', token);
const removeToken = () => localStorage.removeItem('jwt_token');

// Helper pour les requêtes
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  
  // Utiliser application/ld+json pour API Platform (sauf pour les endpoints custom)
  const isApiPlatformEndpoint = !endpoint.includes('/login') && 
                                 !endpoint.includes('/forgot-password') && 
                                 !endpoint.includes('/reset-password') &&
                                 !endpoint.includes('/change-password');
  
  const defaultContentType = isApiPlatformEndpoint ? 'application/ld+json' : 'application/json';
  
  const headers = {
    'Content-Type': options.headers?.['Content-Type'] || defaultContentType,
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // Si 401, le token est probablement expiré
    if (response.status === 401) {
      removeToken();
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || 'Une erreur est survenue');
    }

    // Pour les DELETE qui ne retournent pas de contenu
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ==================== AUTHENTIFICATION ====================

export const authAPI = {
  login: async (username, password) => {
    const response = await apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    
    if (response.token) {
      setToken(response.token);
    }
    
    return response;
  },

  logout: () => {
    removeToken();
  },

  forgotPassword: async (username, garageCode) => {
    return await apiRequest('/admin/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ username, garageCode }),
    });
  },

  resetPassword: async (username, garageCode, newPassword) => {
    return await apiRequest('/admin/reset-password', {
      method: 'PUT',
      body: JSON.stringify({ username, garageCode, newPassword }),
    });
  },

  changePassword: async (currentPassword, newPassword) => {
    return await apiRequest('/admin/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  isAuthenticated: () => {
    return !!getToken();
  },
};

// ==================== VÉHICULES ====================

export const vehiclesAPI = {
  // Récupérer tous les véhicules (public)
  getAll: async () => {
    const response = await apiRequest('/vehicles');
    return response.member || response['hydra:member'] || response;
  },

  // Récupérer tous les véhicules (admin - avec infos supplémentaires)
  getAllAdmin: async () => {
    const response = await apiRequest('/admin/vehicles');
    return response.member || response['hydra:member'] || response;
  },

  // Récupérer un véhicule par ID
  getOne: async (id) => {
    return await apiRequest(`/vehicles/${id}`);
  },

  // Récupérer un véhicule par ID (admin)
  getOneAdmin: async (id) => {
    return await apiRequest(`/admin/vehicles/${id}`);
  },

  // Créer un véhicule (admin)
  create: async (vehicleData) => {
    return await apiRequest('/admin/vehicles', {
      method: 'POST',
      body: JSON.stringify(vehicleData),
    });
  },

  // Mettre à jour un véhicule (admin)
  update: async (id, vehicleData) => {
    return await apiRequest(`/admin/vehicles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(vehicleData),
    });
  },

  // Mettre à jour la disponibilité d'un véhicule (admin)
  updateAvailability: async (id, availabilityData) => {
    return await apiRequest(`/admin/vehicles/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/merge-patch+json',
      },
      body: JSON.stringify(availabilityData),
    });
  },

  // Supprimer un véhicule (admin)
  delete: async (id) => {
    return await apiRequest(`/admin/vehicles/${id}`, {
      method: 'DELETE',
    });
  },
};

// ==================== ÉQUIPEMENTS ====================

export const equipmentsAPI = {
  // Récupérer tous les équipements
  getAll: async () => {
    const response = await apiRequest('/equipments');
    return response.member || response['hydra:member'] || response;
  },

  // Récupérer tous les équipements (admin)
  getAllAdmin: async () => {
    const response = await apiRequest('/admin/equipments');
    return response.member || response['hydra:member'] || response;
  },

  // Récupérer un équipement par ID
  getOne: async (id) => {
    return await apiRequest(`/equipments/${id}`);
  },

  // Créer un équipement (admin)
  create: async (equipmentData) => {
    return await apiRequest('/admin/equipments', {
      method: 'POST',
      body: JSON.stringify(equipmentData),
    });
  },

  // Mettre à jour un équipement (admin)
  update: async (id, equipmentData) => {
    return await apiRequest(`/admin/equipments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(equipmentData),
    });
  },

  // Supprimer un équipement (admin)
  delete: async (id) => {
    return await apiRequest(`/admin/equipments/${id}`, {
      method: 'DELETE',
    });
  },
};

// ==================== RÉSERVATIONS ====================

export const rentalsAPI = {
  // Créer une réservation (public)
  create: async (rentalData) => {
    return await apiRequest('/rentals', {
      method: 'POST',
      body: JSON.stringify(rentalData),
    });
  },

  // Récupérer les réservations d'un véhicule (public)
  getByVehicle: async (vehicleId) => {
    return await apiRequest(`/vehicles/${vehicleId}/rentals`);
  },

  // Vérifier la disponibilité d'un véhicule
  checkAvailability: async (vehicleId, startDate, endDate) => {
    return await apiRequest(`/vehicles/${vehicleId}/availability?start=${startDate}&end=${endDate}`);
  },

  // Récupérer toutes les réservations (admin)
  getAllAdmin: async () => {
    const response = await apiRequest('/admin/rentals');
    return response.member || response['hydra:member'] || response;
  },

  // Récupérer une réservation par ID (admin)
  getOneAdmin: async (id) => {
    return await apiRequest(`/admin/rentals/${id}`);
  },

  // Annuler une réservation (admin)
  cancel: async (id) => {
    return await apiRequest(`/admin/rentals/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/merge-patch+json',
      },
      body: JSON.stringify({ status: 'cancelled' }),
    });
  },
};

// ==================== CATÉGORIES ====================

export const categoriesAPI = {
  getAll: async () => {
    return await apiRequest('/categories');
  },
};

export default {
  auth: authAPI,
  vehicles: vehiclesAPI,
  equipments: equipmentsAPI,
  rentals: rentalsAPI,
  categories: categoriesAPI,
};

