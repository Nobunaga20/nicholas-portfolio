import { navItems, profile } from '../data/portfolioData'

function Navbar() {
  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <a href="#hero" className="brand">
        {profile.name}
      </a>
      <div className="nav-actions">
        <div className="nav-links">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
