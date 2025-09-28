import React from 'react';
import { Link } from 'react-router-dom';
import './MainTitle.css';

interface MainTitleProps {
  title?: string;
  subtitle?: string;
  showActions?: boolean;
  actionText?: string;
  actionLink?: string;
}

const MainTitle: React.FC<MainTitleProps> = ({
  title,
  subtitle,
  showActions = false,
  actionText,
  actionLink
}) => {
  return (
    <div className="main-title">
      <div className="main-title-container">
        {(title || subtitle) && (
          <div className="main-title-content">
            {title && <h1 className="main-title-title">{title}</h1>}
            {subtitle && <p className="main-title-subtitle">{subtitle}</p>}
            
            {showActions && actionText && actionLink && (
              <div className="main-title-actions">
                <Link to={actionLink} className="btn btn-secondary">
                  {actionText}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainTitle;