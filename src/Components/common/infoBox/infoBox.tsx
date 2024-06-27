import React from "react";

import styles from "./infoBox.module.css";

interface InfoBoxProps {
    title: string;
    value: string;
    icon?: React.ReactNode;
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, value, icon }) => {
    return (
        <div className={styles.infoBox}>
            <h3>{title}</h3>
            <div className={styles.infoContainer}>
                {icon}
                <h3>{value}</h3>
            </div>
        </div>
    );
};

export default InfoBox;