// import pending from "../../assets/dashboardtab/pending.png"
interface EmptyStateProps {
  tabType: 'pending' | 'approved' | 'rejected' | 'deleted';
  onAction?: () => void;
}

const EmptyState = ({ tabType }: EmptyStateProps) => {
  const config = {
    pending: {
      icon: '../../assets/dashboardtab/pending.png',
      title: 'No Pending Requests',
      description: 'We’ll keep this space updated and let you know when a new request comes in for review',
    },
    approved: {
      icon: '../../assets/dashboardtab/approved.png',
      title: 'No Approved Properties yet',
      description: 'Once listings are approved, they’ll appear here for your review and management. Stay tuned!',
    },
    rejected: {
      icon: '../../assets/dashboardtab/rejected.png',
      title: 'No Rejected Properties',
      description: 'All listings are currently in good shape. Any rejected entries will be shown here for your review',
    },
    deleted: {
      icon: '../../assets/dashboardtab/deleted.png',
      title: ' No Deleted Properties',
      description: 'All properties are currently active or under review. Deleted listings will appear here for your reference',
    }
  }[tabType];

  return (
    <div className="empty-state-container">
      <img src={config.icon} alt={`Empty ${tabType}`} className="empty-icon" />
      <h3>{config.title}</h3>
      <p>{config.description}</p>
    </div>
  );
};

export default EmptyState;