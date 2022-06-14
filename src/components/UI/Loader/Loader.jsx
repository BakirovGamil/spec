import "./Loader.css";

function Loader({backgroundColor}) {
    return (
        <div className="loading-spinner" style={backgroundColor ? {backgroundColor} : {}}></div>
    );
}

export default Loader;