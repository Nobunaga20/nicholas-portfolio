import { motion, useReducedMotion } from 'motion/react'
import { navItems } from '../data/portfolioData'

const NAV_EASE = [0.22, 1, 0.36, 1]

function Navbar() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.nav
      className="site-nav"
      aria-label="Primary navigation"
      initial={{ opacity: 0, y: reduceMotion ? 0 : -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0.01 : 0.56, ease: NAV_EASE }}
    >
      <div className="nav-inner">
        <motion.a
          href="#hero"
          className="nav-brand"
          aria-label="Go to home"
          whileHover={reduceMotion ? undefined : { y: -1, scale: 1.02 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          NJ
        </motion.a>
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
    </motion.nav>
  )
}

export default Navbar
