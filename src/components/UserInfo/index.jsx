import React from 'react';
import styles from './UserInfo.module.scss';
import { formatDate } from '../../utils/formatDate';

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  const dateFormated = formatDate(additionalText);
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={`http://localhost:4444${avatarUrl}` || '/noavatar.png'} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{dateFormated}</span>
      </div>
    </div>
  );
};
