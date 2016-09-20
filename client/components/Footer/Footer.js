/**
 * Created by alex on 25.08.16.
 */
import React from 'react';
import { Link } from 'react-router';

import styles from './Footer.scss';

let logoSrc = require("./../../../vendor/KWAKE.svg");

function Footer(props) {
  return (
    <div className={styles.container}>
      <div className={styles.brand}>
        <img src={logoSrc}/>
      </div>
      <div className={styles.info}>
        enQounter allows you to create beautiful psychological profiles for <br/>
        yourself and receive ratings from people you`ve encoutered.
      </div>
      <Link to="/">
        Join enQounter for free now!
      </Link>
    </div>
  )
}

export default Footer;
