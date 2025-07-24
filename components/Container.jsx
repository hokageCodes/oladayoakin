import React from 'react'

const Container = ({ children, className = "" }) => {
    return (
        <div className={`w-full max-w-[1140px] px-3 md:px-4 lg:px-5 mx-auto ${className}`}>
            {children}
        </div>
    );
};


export default Container;