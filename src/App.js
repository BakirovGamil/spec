import './null.css';
import './main.css';
import Header from "./components/Header/Header"
import Swiper from './components/Swiper/Swiper';
import Slide from "./components/Swiper/Slide";

function App() {
  return (
    <div className='wrapper'>
        <Header/>
        <main className="main">
          <div className="container">
			<Swiper>
				<Slide>
					<img onDragStart={(e) => e.preventDefault()} src="https://avatars.mds.yandex.net/get-zen_doc/5233619/pub_610cf99265c5547a17feb186_610cfa89bdb1f83a60f41c08/scale_1200" alt="" />
				</Slide>
				<Slide>
					<img onDragStart={(e) => e.preventDefault()} src="https://krot.info/uploads/posts/2022-01/1642900976_3-krot-info-p-sportkari-4.jpg" alt="" />
				</Slide>
				<Slide>
					<img onDragStart={(e) => e.preventDefault()} src="https://img.fonwall.ru/o/96/lamborjdini-tyuning-sportkar-kupe.jpg?route=mid&amp;h=750" alt="" />
				</Slide>
        <Slide>
					<img onDragStart={(e) => e.preventDefault()} src="https://img.fonwall.ru/o/96/lamborjdini-tyuning-sportkar-kupe.jpg?route=mid&amp;h=750" alt="" />
				</Slide>
        <Slide>
					<img onDragStart={(e) => e.preventDefault()} src="https://img.fonwall.ru/o/96/lamborjdini-tyuning-sportkar-kupe.jpg?route=mid&amp;h=750" alt="" />
				</Slide>
			</Swiper>
          </div>
        </main>
        <footer className="footer">
          <div className="container">
            <div className='footer__author'>
              © Бакиров Гамил {(new Date()).getFullYear()}
            </div>
          </div>
        </footer>
    </div>
  );
}

export default App;