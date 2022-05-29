import "./Experience.css";

function Experience({experiences}) {
    return (
        <ul className="Experience">
            {
                experiences.map((experience, indx) => <li key={indx}>{experience}</li>)
            }
        </ul>
    );
}

export default Experience;