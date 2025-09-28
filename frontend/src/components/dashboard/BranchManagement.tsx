import React, { useState, useEffect } from 'react';
import { getTranslations } from '../../i18n';
import { useLanguage } from '../../hooks/useLanguage';
import BranchRegistrationForm from './BranchRegistrationForm';
import './BranchManagement.css';
import { Language } from '../../types/i18n';

interface Branch {
  id: string;
  workshopId: string;
  address: string;
  operatingHours: any; // TODO: Type this properly
  services: string[];
  createdAt: string;
}

interface Workshop {
  id: string;
  name: string;
  phone: string;
  description: string;
  branches?: Branch[];
}

interface BranchManagementProps {
  language?: Language;
}

const BranchManagement: React.FC<BranchManagementProps> = ({ language }) => {
  const context = useLanguage();
  const lang = language || context.language;
  const t = getTranslations(lang);

  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState<string>('');
  const [showBranchForm, setShowBranchForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load workshops - for now using mock data
    const loadWorkshops = async () => {
      setIsLoading(true);
      try {
        // TODO: Replace with actual API call
        // For now, simulate loading workshops
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockWorkshops: Workshop[] = [
          {
            id: '1',
            name: 'AutoService Centro',
            phone: '(11) 99999-9999',
            description: 'Oficina especializada em serviços automotivos',
            branches: []
          }
        ];
        
        setWorkshops(mockWorkshops);
        if (mockWorkshops.length > 0) {
          setSelectedWorkshop(mockWorkshops[0].id);
        }
      } catch (error) {
        console.error(t['console.error.fetchWorkshops'], error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkshops();
  }, [t]);

  const handleWorkshopSelect = (workshopId: string) => {
    setSelectedWorkshop(workshopId);
    setShowBranchForm(false);
  };

  const handleBranchCreated = () => {
    setShowBranchForm(false);
    // TODO: Refresh branches list
  };

  const selectedWorkshopData = workshops.find(w => w.id === selectedWorkshop);

  if (isLoading) {
    return (
      <div className="branch-management">
        <div className="loading-message">{t['loading.workshops']}</div>
      </div>
    );
  }

  if (workshops.length === 0) {
    return (
      <div className="branch-management">
        <div className="empty-state">
          <h3>{t['branch.management.noWorkshops']}</h3>
          <p>{t['branch.management.createWorkshopFirst']}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="branch-management">
      <div className="page-header">
        <h1>{t['branch.management.title']}</h1>
        <p>{t['branch.management.subtitle']}</p>
      </div>

      <div className="workshop-selector">
        <label htmlFor="workshop-select">{t['branch.management.selectWorkshop']}</label>
        <select
          id="workshop-select"
          value={selectedWorkshop}
          onChange={(e) => handleWorkshopSelect(e.target.value)}
          className="workshop-select"
        >
          {workshops.map(workshop => (
            <option key={workshop.id} value={workshop.id}>
              {workshop.name}
            </option>
          ))}
        </select>
      </div>

      {selectedWorkshopData && (
        <div className="workshop-info">
          <h2>{selectedWorkshopData.name}</h2>
          <div className="workshop-details">
            <p><strong>{t['workshop.form.phone']}:</strong> {selectedWorkshopData.phone}</p>
            <p><strong>{t['workshop.form.description']}:</strong> {selectedWorkshopData.description}</p>
          </div>
        </div>
      )}

      <div className="branches-section">
        <div className="section-header">
          <h3>{t['branch.management.branches']}</h3>
          <button
            className="add-branch-btn"
            onClick={() => setShowBranchForm(true)}
            disabled={!selectedWorkshop}
          >
            {t['branch.management.addBranch']}
          </button>
        </div>

        {showBranchForm && (
          <div className="branch-form-container">
            <h4>{t['branch.management.newBranch']}</h4>
            <BranchRegistrationForm
              workshopId={selectedWorkshop}
              language={language}
              onSubmitSuccess={handleBranchCreated}
            />
          </div>
        )}

        <div className="branches-list">
          {selectedWorkshopData?.branches?.length === 0 && (
            <div className="empty-branches">
              <p>{t['branch.management.noBranches']}</p>
            </div>
          )}

          {selectedWorkshopData?.branches?.map(branch => (
            <div key={branch.id} className="branch-card">
              <div className="branch-info">
                <h4>{t['branch.form.address']}</h4>
                <p>{branch.address}</p>
                <div className="branch-services">
                  <strong>{t['branch.form.services']}:</strong>
                  <div className="services-list">
                    {branch.services.map(service => (
                      <span key={service} className="service-tag">{service}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="branch-actions">
                <button className="edit-btn">{t['branch.management.edit']}</button>
                <button className="delete-btn">{t['branch.management.delete']}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BranchManagement;