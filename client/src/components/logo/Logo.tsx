import React from 'react'
import styles from "./Logo.module.scss"
import { NavLink } from 'react-router-dom'

const Logo : React.FC= () => {
  return (
    <div className={styles.Logo}>
      <NavLink to={"/"}><img src="/assets/images/ipma_logo_small.png" className={styles.image} alt="logo"/></NavLink>
    </div>
  )
}

export default Logo
