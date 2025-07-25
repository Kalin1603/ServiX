import React, { FC } from 'react';
import { Car, ServiceRecord, User } from '../types';
import { useI18n } from '../hooks/useI18n';
import { ServiceHistory } from './ServiceHistory';
import { currencyService } from '../services/currencyService';
import { useCurrency } from '../hooks/useCurrency';

interface DashboardScreenProps {
    car: Car;
    services: ServiceRecord[];
    user: User;
    onEditService: (service: ServiceRecord) => void;
    onDeleteService: (serviceId: string) => void;
}

export const DashboardScreen: FC<DashboardScreenProps> = ({ car, services, user, onEditService, onDeleteService }) => {
    const { t } = useI18n();
    const { currency } = useCurrency();

    const totalSpent = services.reduce((acc, s) => acc + s.cost, 0);
    
    return (
        <div className="screen-content">
            <div className="screen-header">
                <h1>{t('dashboard.welcome', { name: user.fullName.split(' ')[0] || user.username })}</h1>
            </div>
            <div className="dashboard-grid">
                 <div className="card car-summary-card">
                     <h2 className="card-title">{car.make || t('dashboard.yourCar')} {car.model || ''}</h2>
                     <p><strong>{t('dashboard.mileage')}:</strong> {car.mileage.toLocaleString()} km</p>
                     <p><strong>{t('dashboard.year')}:</strong> {car.year}</p>
                     <p><strong>{t('dashboard.vin')}:</strong> {car.vin || t('dashboard.noVin')}</p>
                 </div>
                 <div className="card stats-card">
                    <h2 className="card-title">{t('dashboard.statistics')}</h2>
                    <div className="stats-content">
                        <div>
                            <span className="stat-value">{services.length}</span>
                            <span className="stat-label">{t('dashboard.totalServices')}</span>
                        </div>
                        <div>
                            <span className="stat-value">{currencyService.format(totalSpent, currency)}</span>
                            <span className="stat-label">{t('dashboard.totalSpent')}</span>
                        </div>
                    </div>
                 </div>
            </div>
           
            <ServiceHistory services={services} onEdit={onEditService} onDelete={onDeleteService} />
        </div>
    );
};