import "./Finder.css";
import Header from "../../components/Header/Header";
import Input from "../../components/UI/Input/Input";
import { useMemo, useRef, useState } from "react";
import Button from "../../components/UI/Button/Button";
import FinderSort from "../../components/FinderSort/FinderSort";
import FinderFindBy from "../../components/FinderFindBy/FinderFindBy";
import SpecialistService from "../../API/SpecialistService";
import ImageService from "../../API/ImageService";
import CommentService from "../../API/CommentService";
import FinderSpecialist from "../../components/FinderSpecialist/FinderSpecialist";
import useSortSpecialists from "../../hooks/useSortSpecialists";
import { useParams } from "react-router-dom";

function Finder() {
    const formRef = useRef(null);
    const [findBy, setFindBy] = useState("name");
    const [sort, setSort] = useState({field: "name", order: 0});
    const [specialists, setSpecialists] = useState([]);
    const {query} = useParams();

    const sortedSpecialists = useSortSpecialists(sort, specialists);

    async function handleSubmit(e) {
        e.preventDefault();

        findSpecilists();
    }

    async function findSpecilists() {
        const form = formRef.current;
        if(findBy === "name") {
            const resSpecialists = await SpecialistService.getAllByName(form.query.value);
            const resSpecialistsBody = await resSpecialists.json();

            setSpecialists(await getFullInfoOfSpecialists(resSpecialistsBody));
        } else {
            const resSpecialists = await SpecialistService.getAllByProfession(form.query.value);
            const resSpecialistsBody = await resSpecialists.json();

            setSpecialists(await getFullInfoOfSpecialists(resSpecialistsBody));
        }
    }

    return (<>
        <Header/>
        <main>
            <div className="finder">
                <div className="container">
                    <div className="finder__body">
                        <div className="finder__actions">
                            <form className="finder__form" ref={formRef} onSubmit={handleSubmit}>
                                <Input className="finder__input" placeholder={"Напишите для поиска..."} isBackground name="query" defaultValue={query}/>
                                <Button isBackground>
                                    Поиск
                                </Button>
                            </form>
                            <FinderFindBy findBy={findBy} setFindBy={setFindBy}/>
                            <FinderSort sort={sort} setSort={setSort}/>
                        </div>
                        <div className="finder__specialists">
                            {   sortedSpecialists.length === 0 &&
                                <div className="finder__empty">
                                    ПУСТО
                                </div>
                            }
                            {
                                sortedSpecialists.map(specialist => <FinderSpecialist key={specialist.id} specialist={specialist} specialists={specialists} setSpecialists={setSpecialists}/>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>)
}

export default Finder;


//Меняет исходный массив
async function getFullInfoOfSpecialists(specialists) {
    for(let specialist of specialists) {
        const resAvatar = await ImageService.getAvatarByUsertId(specialist.user.id);
        const resAvatarBody = await resAvatar.json();
        
        if(resAvatar.ok) specialist.avatar = resAvatarBody[0];

        const resStat = await CommentService.getCommentStatsOfSpecialist(specialist.id);
        const resStatBody = await resStat.json()

        if(resStat.ok) specialist.stats = resStatBody;
    }

    console.log(specialists);

    return specialists;
}