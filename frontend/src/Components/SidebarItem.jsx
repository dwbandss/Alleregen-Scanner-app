function SidebarItem({ icon, label, setActivePage }) {
  return (
    <div
      className="sidebar-item"
      onClick={() => {
        setActivePage(label);
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export default SidebarItem;
