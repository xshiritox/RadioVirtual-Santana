import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useFirestore } from '../hooks/useFirestore';
import { X, Edit3, Save, Plus, Trash2, Eye, EyeOff } from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { user, login, logout } = useAuth();
  const { data: programs, updateDocument, addDocument, deleteDocument } = useFirestore('programs');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [editingProgram, setEditingProgram] = useState<any>(null);
  const [newProgram, setNewProgram] = useState({
    title: '',
    host: '',
    time: '',
    description: '',
    days: [],
    image: '',
    featured: false
  });
  const [activeTab, setActiveTab] = useState('programs');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginData.email, loginData.password);
    } catch (error) {
      alert('Error al iniciar sesión. Verifica tus credenciales.');
    }
  };

  const handleSaveProgram = async () => {
    if (editingProgram) {
      await updateDocument(editingProgram.id, editingProgram);
      setEditingProgram(null);
    }
  };

  const handleAddProgram = async () => {
    if (newProgram.title && newProgram.host) {
      await addDocument(newProgram);
      setNewProgram({
        title: '',
        host: '',
        time: '',
        description: '',
        days: [],
        image: '',
        featured: false
      });
    }
  };

  const handleDeleteProgram = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este programa?')) {
      await deleteDocument(id);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-dark-900/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-dark-800 border border-gold-400/30 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gold-400/20">
          <h2 className="text-2xl font-bold text-gold-400">Panel de Administración</h2>
          <button
            onClick={onClose}
            className="text-silver-400 hover:text-gold-400 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {!user ? (
            /* Login Form */
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                Iniciar Sesión
              </h3>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-silver-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-700 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300"
                    placeholder="admin@radiosantana.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-silver-400 mb-2">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="w-full px-4 py-3 bg-dark-700 border border-gold-400/20 rounded-lg text-white placeholder-silver-500 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 transition-all duration-300 pr-12"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-silver-400 hover:text-gold-400 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-gold text-dark-900 py-3 rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
                >
                  Iniciar Sesión
                </button>
              </form>

              <div className="mt-6 p-4 bg-dark-700/50 rounded-lg border border-gold-400/20">
                <p className="text-silver-400 text-sm text-center">
                  <strong>Credenciales de Demo:</strong><br />
                  Email: admin@radiosantana.com<br />
                  Contraseña: admin123
                </p>
              </div>
            </div>
          ) : (
            /* Admin Dashboard */
            <div>
              {/* User Info & Logout */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gold-400/20">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Bienvenido, {user.email}
                  </h3>
                  <p className="text-silver-400 text-sm">Panel de administración de Radio Santana</p>
                </div>
                <button
                  onClick={logout}
                  className="bg-dark-700 border border-gold-400/30 text-gold-400 px-4 py-2 rounded-lg hover:bg-gold-400 hover:text-dark-900 transition-all duration-300"
                >
                  Cerrar Sesión
                </button>
              </div>

              {/* Tabs */}
              <div className="flex space-x-4 mb-8">
                {['programs', 'settings'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === tab
                        ? 'bg-gradient-gold text-dark-900'
                        : 'bg-dark-700 text-silver-400 hover:text-gold-400'
                    }`}
                  >
                    {tab === 'programs' ? 'Programas' : 'Configuración'}
                  </button>
                ))}
              </div>

              {/* Programs Tab */}
              {activeTab === 'programs' && (
                <div className="space-y-6">
                  {/* Add New Program */}
                  <div className="bg-dark-700/50 border border-gold-400/20 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Plus className="w-5 h-5 mr-2" />
                      Agregar Nuevo Programa
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Título del programa"
                        value={newProgram.title}
                        onChange={(e) => setNewProgram({ ...newProgram, title: e.target.value })}
                        className="px-3 py-2 bg-dark-600 border border-gold-400/20 rounded text-white text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Presentador"
                        value={newProgram.host}
                        onChange={(e) => setNewProgram({ ...newProgram, host: e.target.value })}
                        className="px-3 py-2 bg-dark-600 border border-gold-400/20 rounded text-white text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Horario (ej: 14:00 - 18:00)"
                        value={newProgram.time}
                        onChange={(e) => setNewProgram({ ...newProgram, time: e.target.value })}
                        className="px-3 py-2 bg-dark-600 border border-gold-400/20 rounded text-white text-sm"
                      />
                      <input
                        type="url"
                        placeholder="URL de imagen"
                        value={newProgram.image}
                        onChange={(e) => setNewProgram({ ...newProgram, image: e.target.value })}
                        className="px-3 py-2 bg-dark-600 border border-gold-400/20 rounded text-white text-sm"
                      />
                    </div>
                    
                    <textarea
                      placeholder="Descripción del programa"
                      value={newProgram.description}
                      onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-600 border border-gold-400/20 rounded text-white text-sm mb-4"
                      rows={3}
                    />
                    
                    <button
                      onClick={handleAddProgram}
                      className="bg-gradient-gold text-dark-900 px-4 py-2 rounded font-medium hover:scale-105 transition-transform"
                    >
                      Agregar Programa
                    </button>
                  </div>

                  {/* Programs List */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Programas Existentes</h4>
                    {programs.map((program) => (
                      <div key={program.id} className="bg-dark-700/50 border border-gold-400/20 rounded-lg p-4">
                        {editingProgram?.id === program.id ? (
                          <div className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <input
                                type="text"
                                value={editingProgram.title}
                                onChange={(e) => setEditingProgram({ ...editingProgram, title: e.target.value })}
                                className="px-3 py-2 bg-dark-600 border border-gold-400/20 rounded text-white text-sm"
                              />
                              <input
                                type="text"
                                value={editingProgram.host}
                                onChange={(e) => setEditingProgram({ ...editingProgram, host: e.target.value })}
                                className="px-3 py-2 bg-dark-600 border border-gold-400/20 rounded text-white text-sm"
                              />
                            </div>
                            <textarea
                              value={editingProgram.description}
                              onChange={(e) => setEditingProgram({ ...editingProgram, description: e.target.value })}
                              className="w-full px-3 py-2 bg-dark-600 border border-gold-400/20 rounded text-white text-sm"
                              rows={2}
                            />
                            <div className="flex space-x-2">
                              <button
                                onClick={handleSaveProgram}
                                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:scale-105 transition-transform flex items-center space-x-1"
                              >
                                <Save className="w-4 h-4" />
                                <span>Guardar</span>
                              </button>
                              <button
                                onClick={() => setEditingProgram(null)}
                                className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:scale-105 transition-transform"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-semibold text-white">{program.title}</h5>
                              <p className="text-silver-400 text-sm">{program.host} - {program.time}</p>
                              <p className="text-silver-300 text-sm mt-1">{program.description}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setEditingProgram(program)}
                                className="bg-blue-600 text-white p-2 rounded hover:scale-105 transition-transform"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProgram(program.id)}
                                className="bg-red-600 text-white p-2 rounded hover:scale-105 transition-transform"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="bg-dark-700/50 border border-gold-400/20 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Configuración General</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-silver-400 mb-2">
                        URL del Stream de Radio
                      </label>
                      <input
                        type="url"
                        placeholder="https://stream.zeno.fm/your-stream"
                        className="w-full px-3 py-2 bg-dark-600 border border-gold-400/20 rounded text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-silver-400 mb-2">
                        Título del Sitio
                      </label>
                      <input
                        type="text"
                        placeholder="Radio Santana - Tu Radio Virtual"
                        className="w-full px-3 py-2 bg-dark-600 border border-gold-400/20 rounded text-white text-sm"
                      />
                    </div>
                    <button className="bg-gradient-gold text-dark-900 px-4 py-2 rounded font-medium hover:scale-105 transition-transform">
                      Guardar Configuración
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;