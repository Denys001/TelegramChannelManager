import React from 'react'
import styles from './Loader.module.css'
const Loader = () => {
    return (
        <>
            <div className={styles.overlay}>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.loader}>Loading...</div>
            </div>
        </>
    )
}

export default Loader
