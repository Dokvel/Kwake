import React from 'react';
import marked from 'marked';

import styles from './TermsPage.scss';
import terms from '../../../../../data/terms_of_use';

function createMarkup() { return {__html: marked(terms)}; };

export default function TermsPage(props) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper} dangerouslySetInnerHTML={createMarkup()}>
      </div>
    </div>
  );
}
