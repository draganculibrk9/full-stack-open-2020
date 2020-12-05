import React from 'react';

const Header: React.FC<{ header: string }> = ({header}) => (
    <h1>{header}</h1>
);

export default Header;