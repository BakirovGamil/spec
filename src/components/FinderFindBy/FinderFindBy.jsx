import RadioButton from "../UI/RadioButton/RadioButton";

function FinderFindBy({findBy, setFindBy}) {
    function handleChangeFindBy(value) {
        setFindBy(value);
    }

    return (
        <div className="finder__findBy">
            <div className="finder__radio" onClick={() => handleChangeFindBy("name")}>
                <RadioButton name="findBy" value="name" checked={findBy === 'name'} onChange={() => handleChangeFindBy("name")}/>
                По имени
            </div>
            <div className="finder__radio" onClick={() => handleChangeFindBy("profession")}>
                <RadioButton name="findBy" value="profession" checked={findBy === 'profession'}  onChange={() => handleChangeFindBy("profession")}/>
                По профессии
            </div>
        </div>
    )
}

export default FinderFindBy;