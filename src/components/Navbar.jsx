import { navItems } from '../data/portfolioData'

function Navbar() {
  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <div className="nav-inner">
        <a href="#hero" className="nav-brand" aria-label="Go to home">
          NJ
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
      </div>
    </nav>
  )
}

export default Navbar
