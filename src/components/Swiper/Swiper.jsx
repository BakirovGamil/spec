import { createRef, useEffect, useState } from "react";
import "./Swiper.css"
import RadioButton from "../UI/RadioButton/RadioButton"
import Button from "../UI/Button/Button";

function Swiper({children, isPagination, isButton, className}) {
    const [slideIndex, setSlideIndex] = useState(0);
    const swiperWrapperRef = createRef();
    const id = useState(Math.random());

    useEffect(() => {
        window.onresize = () => {
            changeSlide(slideIndex);
        }
    });

    function changeSlide(indx) {
        const swiperWrapper = swiperWrapperRef.current;
        const slideWidth = swiperWrapper.offsetWidth;
        setSlideIndex(indx);
        swiperWrapper.style.transition = "transform 0.4s";

        swiperWrapper.style.transform = `translate3d(${-indx * (slideWidth + 10)}px, 0px, 0px)`
    }

    function swipeStart(e) {
        const pointerEventToXY = function(e){
            const out = {x:0, y:0};
            if(e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend'){
                const touch = e.touches[0] || e.changedTouches[0];
                out.x = touch.clientX;
                out.y = touch.clientY;
            } else if (e.type === 'mousedown' || e.type === 'mouseup' || e.type === 'mousemove') {
                out.x = e.clientX;
                out.y = e.clientY;
            }
            return out;
        };

        const initPos = pointerEventToXY(e);

        const swiperWrapper = swiperWrapperRef.current;
        const trfRegExp = /[-0-9.]+(?=px)/;
        const transform = swiperWrapper.style.transform.match(trfRegExp);
        swiperWrapper.style.transition = "";
        swiperWrapper.style.cursor = "grabbing";

        function movaAt(x) {
            swiperWrapper.style.transform = `translate3d(${x}px, 0px, 0px)`
        }

        function swipeMove(e) {
            const pos = pointerEventToXY(e);
            if(Math.abs(initPos.y - pos.y) > Math.abs(initPos.x - pos.x) ) return;

            movaAt(transform - (initPos.x - pos.x));
        }

        function swipeEnd(e) {
            const posX = pointerEventToXY(e).x;
            let currentIndex = slideIndex;

            if(initPos.x - posX > 80) ++currentIndex; // Если сдвинули на 80 пикселей то след слайд
            if(initPos.x - posX <  - 80) --currentIndex; // Если сдвинули на -80 пикселей то пред слайд

            if(currentIndex < 0) ++currentIndex; // если левый крайний элемент то вовзращаем к нему
            if(currentIndex > children.length - 1) --currentIndex; // если правый крайний элемент то вовзращаем к нему

            if(initPos.x !== posX)
                changeSlide(currentIndex);
 
            document.removeEventListener("mousemove", swipeMove);
            document.removeEventListener("touchmove", swipeMove);
            document.removeEventListener("mouseup", swipeEnd);
            document.removeEventListener("touchend", swipeEnd);
            
            swiperWrapper.style.cursor = "grab";
        }

        document.addEventListener("mousemove", swipeMove);
        document.addEventListener("touchmove", swipeMove);
        document.addEventListener("mouseup", swipeEnd);
        document.addEventListener("touchend", swipeEnd);
    }

    function setPrevSlide() {
        let currentIndex = slideIndex;
        if(currentIndex !== 0) currentIndex--;

        changeSlide(currentIndex);
    }

    function setNextSlide() {
        let currentIndex = slideIndex;
        if(currentIndex !== children.length - 1) currentIndex++;

        changeSlide(currentIndex);
    }

    return (
        <div className={className ? [className, "swiper"].join(" ") : "swiper"}>
            <div className="swiper__list">
                <div className="swiper__wrapper" ref={swiperWrapperRef} onMouseDown={swipeStart} onTouchStart={swipeStart}>
                    {children}
                </div>
            </div>
            {
                isPagination &&
                <div className="swiper__pagination">
                    {children.map((slide, indx) => {
                        return <RadioButton name={id[0]} key={indx} checked={slideIndex === indx} onChange={() => {changeSlide(indx)}}/>
                    })}
                </div>
            }
            { isButton && <>
                    {   !!slideIndex && 
                        <Button onClick={setPrevSlide} className="swiper__prev"><i className="gg-chevron-left"></i></Button>
                    }
                    
                    {   slideIndex !== children.length - 1 &&
                        <Button onClick={setNextSlide} className="swiper__next"><i className="gg-chevron-right"></i></Button>
                    }
            </>}
        </div>
    );
}

export default Swiper;