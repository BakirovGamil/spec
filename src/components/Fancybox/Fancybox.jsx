import React, { useEffect } from "react";

import { Fancybox as NativeFancybox } from "@fancyapps/ui/dist/fancybox.esm.js";
import "@fancyapps/ui/dist/fancybox.css";
import "./Fancybox.css";

function Fancybox(props) {
  const delegate = props.delegate || "[data-fancybox]";

  useEffect(() => {
    const opts =  { ...props.options,
      Toolbar: {
        display: [
          {
            id: "counter",
            position: "center",
          },
          {
            id: "close",
            position: "right",
          },
        ],
      },

      on: {
        initLayout: (fancybox) => {
          const $leftCol = document.createElement("div");
          $leftCol.classList.add("fancybox__leftCol");
    
          while (fancybox.$container.firstChild) {
            $leftCol.appendChild(fancybox.$container.firstChild);
          }
    
          const $rightCol = document.createElement("div");
          $rightCol.classList.add("fancybox__rightCol");
    
          const $info = document.createElement("div");
          $rightCol.appendChild($info);
          fancybox.$info = $info;
    
          fancybox.$container.appendChild(fancybox.$backdrop);
    
          fancybox.$container.appendChild($leftCol);
          fancybox.$container.appendChild($rightCol);
    
          fancybox.$leftCol = $leftCol;
          fancybox.$rightCol = $rightCol;
        },
        "Carousel.ready Carousel.change": (fancybox, carousel, slideIndex) => {
          slideIndex =
            slideIndex === undefined ? carousel.options.initialPage : slideIndex;
          const $trigger = fancybox.items[slideIndex].$trigger;

          const data = $trigger.dataset.info || "";

          fancybox.$info.innerHTML = `<p>${data}</p>`;
        },
      },
    };
    
    NativeFancybox.bind(delegate, opts);

    return () => {
      NativeFancybox.destroy();
    };
  }, []);

  return <>{props.children}</>;
}

export default Fancybox;