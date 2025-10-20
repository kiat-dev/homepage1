

const Label = ({ children, className = "", style = {} }) => {
    const baseClass = "text-blue-900 mb-1";
    const baseStyle = { textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" };

    return (
        <label className={`${baseClass} ${className}`} style={{ ...baseStyle, ...style }}>
            {children}
        </label>
    );
};

export default Label;
