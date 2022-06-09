import { useEffect, useState } from "react";
import CommentService from "../../API/CommentService";
import ImageService from "../../API/ImageService";
import SpecialistService from "../../API/SpecialistService";
import FinderSort from "../../components/FinderSort/FinderSort";
import FinderSpecialist from "../../components/FinderSpecialist/FinderSpecialist";
import Header from "../../components/Header/Header";
import useSortSpecialists from "../../hooks/useSortSpecialists";
import "./Moderation.css";

function Moderation() {
    const [specialists, setSpecialists] = useState([]);
    const [sort, setSort] = useState({field: "name", order: 0});

    useEffect(() => {
        (async() => {
            const resSpecialists = await SpecialistService.getAllNotVerify();
            const resSpecialistsBody = await resSpecialists.json();

            await getFullInfoOfSpecialists(resSpecialistsBody);
            setSpecialists(resSpecialistsBody);
        })();    
    }, []);

    const sortedSpecialists = useSortSpecialists(sort, specialists);
    
    return (<>
        <Header/>
        <main>
            <div className="Moderation">
                <div className="container">
                    <div className="Moderation__body">
                        <div className="Moderation__title">
                            Список непроверенных специалистов
                        </div>
                        
                        <FinderSort sort={sort} setSort={setSort}/>
                    
                        <div className="finder__specialists">
                            {   sortedSpecialists.length === 0 &&
                                <div className="finder__empty">
                                    ПУСТО
                                </div>
                            }
                            {
                                sortedSpecialists.map(specialist => {
                                    console.log(specialist);
                                return <FinderSpecialist key={specialist.id} specialist={specialist} specialists={specialists} setSpecialists={setSpecialists}/>})
                            }
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>);
}

export default Moderation;


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