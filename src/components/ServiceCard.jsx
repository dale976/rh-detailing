import { Link } from 'react-router-dom';

export default function ServiceCard({ service }) {
  return (
    <Link
      className="service-card"
      to={`/services-pricing#${service.id}`}
      aria-labelledby={`service-${service.id}`}
    >
      <div className="service-card-top">
        <span className="service-number">{service.number}</span>
        <p className="eyebrow">{service.category}</p>
      </div>
      <h3 id={`service-${service.id}`}>{service.name}</h3>
      <p>{service.summary}</p>
      {service.id === 'maintenance' && (
        <small>For returning customers after an initial clean.</small>
      )}
      <div className="service-card-bottom">
        <span className="price">
          <small>From</small> £{service.price}
        </span>
        <span className="service-card-details">View details</span>
      </div>
    </Link>
  );
}
