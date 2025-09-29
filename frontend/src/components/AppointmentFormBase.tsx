import React, { useState, useEffect, useCallback, useRef } from 'react';
import Select from 'react-select';
import { AppointmentService } from '../services/appointmentService';
import { ServiceTypeService } from '../services/serviceTypeService';
import { VehicleCatalogService } from '../services/vehicleCatalogService';
import { FormData, AvailableTimeSlot, ServiceType } from '../types/appointment';
import { VehicleCatalog } from '../types/vehicle';
import { Language } from '../types/i18n';
import { getTranslations } from '../i18n';
import { formatPhone, isValidPhone } from '../utils/validation';
import './AppointmentForm.css';

interface Branch {
    id: string;
    address: string;
    services: string[];
}

interface AppointmentFormBaseProps {
    workshop: string;
    language: Language;
    initialData?: Partial<FormData>;
    onSubmit: (data: FormData) => Promise<void> | void;
    onCancel?: () => void;
}

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 30 }, (_, i) => CURRENT_YEAR - i);

export const AppointmentFormBase: React.FC<AppointmentFormBaseProps> = ({
    workshop,
    language,
    initialData = {},
    onSubmit,
    onCancel,
}) => {
    const t = getTranslations(language);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
    const [vehicleCatalog, setVehicleCatalog] = useState<VehicleCatalog>({});
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingServiceTypes, setIsLoadingServiceTypes] = useState(false);
    const [isLoadingVehicleCatalog, setIsLoadingVehicleCatalog] = useState(false);
    const [modelOptions, setModelOptions] = useState<string[]>([]);

    // Scroll the page to the top when the form mounts
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const [formData, setFormData] = useState<FormData>({
        clientName: initialData.clientName || '',
        clientPhone: initialData.clientPhone || '',
        vehicleBrand: initialData.vehicleBrand || '',
        vehicleModel: initialData.vehicleModel || '',
        vehicleYear: initialData.vehicleYear || '',
        serviceTypes: initialData.serviceTypes || [],
        appointmentDate: initialData.appointmentDate || '',
        appointmentTime: initialData.appointmentTime || '',
        branchId: initialData.branchId || ''
    });

    // Fetch branches (mock for now)
    useEffect(() => {
        // You can replace this with a real API call if needed
        const mockBranches: Branch[] = [
            {
                id: 'branch-1',
                address: '123 Main Street, Downtown',
                services: ['Oil change', 'Full revision', 'Brakes', 'Suspension']
            },
            {
                id: 'branch-2',
                address: '456 Oak Avenue, Uptown',
                services: ['Alignment and balancing', 'Tire replacement', 'Air conditioning', 'Others']
            }
        ];
        setBranches(mockBranches);
    }, [workshop]);

    // Fetch service types
    const fetchServiceTypes = useCallback(async () => {
        setIsLoadingServiceTypes(true);
        try {
            const types = await ServiceTypeService.getActiveServiceTypes(workshop);
            setServiceTypes(types);
        } catch (error) {
            setServiceTypes(ServiceTypeService.getDefaultServiceTypes());
        } finally {
            setIsLoadingServiceTypes(false);
        }
    }, [workshop]);

    // Fetch vehicle catalog
    const fetchVehicleCatalog = useCallback(async () => {
        setIsLoadingVehicleCatalog(true);
        try {
            const catalogResponse = await VehicleCatalogService.getVehicleCatalog(workshop, language);
            setVehicleCatalog(catalogResponse.vehicleCatalog);
        } catch (error) {
            setVehicleCatalog(VehicleCatalogService.getDefaultVehicleCatalog().vehicleCatalog);
        } finally {
            setIsLoadingVehicleCatalog(false);
        }
    }, [workshop, language]);

    // Fetch available time slots
    const fetchAvailableTimeSlots = async (date: string) => {
        if (!date) return;
        setIsLoading(true);
        try {
            const slots: AvailableTimeSlot = await AppointmentService.getAvailableTimeSlots(date, workshop, language);
            setAvailableSlots(slots.timeSlots);
        } catch (error) {
            setAvailableSlots(AppointmentService.getDefaultAvailableTimeSlots(date).timeSlots);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchServiceTypes();
        fetchVehicleCatalog();
    }, [fetchServiceTypes, fetchVehicleCatalog]);

    useEffect(() => {
        if (formData.vehicleBrand) {
            setModelOptions(vehicleCatalog[formData.vehicleBrand] || []);
        }
    }, [formData.vehicleBrand, vehicleCatalog]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (name === 'appointmentDate') {
            setFormData(prev => ({ ...prev, appointmentTime: '' }));
            fetchAvailableTimeSlots(value);
        }
    };

    const handleBrandChange = (selected: { value: string; label: string } | null) => {
        const brand = selected ? selected.value : '';
        setFormData(prev => ({
            ...prev,
            vehicleBrand: brand,
            vehicleModel: ''
        }));
        setModelOptions(vehicleCatalog[brand] || []);
    };

    const handleBranchChange = (selected: { value: string; label: string } | null) => {
        const branchId = selected ? selected.value : '';
        setFormData(prev => ({
            ...prev,
            branchId: branchId,
            serviceTypes: []
        }));
        // O parent pode atualizar serviceTypes se quiser
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        const masked = formatPhone(raw, language);
        setFormData(prev => ({ ...prev, clientPhone: masked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await onSubmit(formData);
        } finally {
            setIsLoading(false);
        }
    };

    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="form-section">
                <h3>{t['form.clientInfo']}</h3>
                <div className="form-group">
                    <label htmlFor="clientName">{t['form.clientName']}</label>
                    <input
                        type="text"
                        id="clientName"
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="clientPhone">{t['form.clientPhone']}</label>
                    <input
                        type="tel"
                        id="clientPhone"
                        name="clientPhone"
                        value={formData.clientPhone}
                        onChange={handlePhoneChange}
                        placeholder={t['placeholder.phone']}
                        required
                    />
                </div>
            </div>
            <div className="form-section">
                <h3>{t['form.vehicleInfo']}</h3>
                <div className="form-group">
                    <label htmlFor="react-select-vehicleBrand-input">{t['form.vehicleBrand']}</label>
                    <Select
                        inputId="react-select-vehicleBrand-input"
                        name="vehicleBrand"
                        options={Object.keys(vehicleCatalog).map(brand => ({ value: brand, label: brand }))}
                        value={formData.vehicleBrand ? { value: formData.vehicleBrand, label: formData.vehicleBrand } : null}
                        onChange={handleBrandChange}
                        placeholder={t['form.vehicleBrand']}
                        isClearable
                        isSearchable
                        classNamePrefix="react-select"
                    />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="react-select-vehicleModel-input">{t['form.vehicleModel']}</label>
                        <Select
                            inputId="react-select-vehicleModel-input"
                            name="vehicleModel"
                            options={modelOptions.map(model => ({ value: model, label: model }))}
                            value={formData.vehicleModel ? { value: formData.vehicleModel, label: formData.vehicleModel } : null}
                            onChange={(selected) => {
                                const model = selected ? selected.value : '';
                                setFormData(prev => ({ ...prev, vehicleModel: model }));
                            }}
                            placeholder={t['form.vehicleModel']}
                            isClearable
                            isSearchable
                            isDisabled={!formData.vehicleBrand}
                            classNamePrefix="react-select"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="react-select-vehicleYear-input">{t['form.vehicleYear']}</label>
                        <Select
                            inputId="react-select-vehicleYear-input"
                            name="vehicleYear"
                            options={YEARS.map(year => ({ value: year.toString(), label: year.toString() }))}
                            value={formData.vehicleYear ? { value: formData.vehicleYear, label: formData.vehicleYear } : null}
                            onChange={(selected) => {
                                const year = selected ? selected.value : '';
                                setFormData(prev => ({ ...prev, vehicleYear: year }));
                            }}
                            placeholder={t['message.selectYear']}
                            isClearable
                            isSearchable
                            classNamePrefix="react-select"
                        />
                    </div>
                </div>
            </div>
            <div className="form-section">
                <h3>{t['form.serviceScheduling']}</h3>
                {branches.length > 1 && (
                    <div className="form-group">
                        <label htmlFor="react-select-branch-input">{t['form.selectBranch']}</label>
                        <Select
                            inputId="react-select-branch-input"
                            name="branchId"
                            options={branches.map(branch => ({
                                value: branch.id,
                                label: `${branch.address} (${branch.services.length} services)`
                            }))}
                            value={formData.branchId ?
                                branches.find(branch => branch.id === formData.branchId) ?
                                    {
                                        value: formData.branchId,
                                        label: `${branches.find(branch => branch.id === formData.branchId)!.address} (${branches.find(branch => branch.id === formData.branchId)!.services.length} services)`
                                    } : null
                                : null
                            }
                            onChange={handleBranchChange}
                            placeholder={t['message.selectBranch']}
                            isClearable
                            isSearchable
                            classNamePrefix="react-select"
                        />
                    </div>
                )}
                <div className="form-group">
                    <label htmlFor="react-select-serviceType-input">{t['form.serviceType']}</label>
                    <Select
                        inputId="react-select-serviceType-input"
                        name="serviceType"
                        options={serviceTypes.map(service => ({ value: service.name, label: service.name }))}
                        value={formData.serviceTypes.map(type => ({ value: type, label: type }))}
                        onChange={(selected) => {
                            const types = selected ? (selected as any[]).map((item: any) => item.value) : [];
                            setFormData(prev => ({ ...prev, serviceTypes: types }));
                        }}
                        placeholder={t['message.selectService']}
                        isClearable
                        isSearchable
                        isMulti
                        classNamePrefix="react-select"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="appointmentDate">{t['form.appointmentDate']}</label>
                    <input
                        type="date"
                        id="appointmentDate"
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleInputChange}
                        min={getTomorrowDate()}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="react-select-appointmentTime-input">{t['form.appointmentTime']}</label>
                    <Select
                        inputId="react-select-appointmentTime-input"
                        name="appointmentTime"
                        className="select-appointment-time"
                        options={(availableSlots || []).map(time => ({ value: time, label: time }))}
                        value={formData.appointmentTime ? { value: formData.appointmentTime, label: formData.appointmentTime } : null}
                        onChange={(selected) => {
                            const time = selected ? selected.value : '';
                            setFormData(prev => ({ ...prev, appointmentTime: time }));
                        }}
                        placeholder={t['message.selectTime']}
                        isClearable
                        isSearchable
                        isDisabled={!formData.appointmentDate}
                        classNamePrefix="react-select"
                    />
                </div>
            </div>
            <div className="form-actions">
                <button type="submit" className="submit-button" disabled={isLoading}>
                    {isLoading ? t['form.processing'] : t['form.submit']}
                </button>
                {onCancel && (
                    <button type="button" className="cancel-button" onClick={onCancel}>
                        {t['form.cancel'] || 'Cancel'}
                    </button>
                )}
            </div>
        </form>
    );
};

export default AppointmentFormBase;
