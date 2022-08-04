import React from 'react';
import FlashMessage from '../components/common/Flashmessage';

const PlaneLayout: React.FC = ({ children }) => {
    return (
        <div style={{ minHeight: 'calc(100vh - 60px- 30px)', display: 'flex' }}>
            <div style={{ alignSelf: 'stretch', width: '100%', overflowX: 'hidden' }}>
                {children}
                <FlashMessage />
            </div>
        </div>
    );
};

export default PlaneLayout;
