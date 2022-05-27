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
          const $photoColumn = document.createElement("div");
          $photoColumn.classList.add("fancybox__leftCol");
    
          while (fancybox.$container.firstChild) {
            $photoColumn.appendChild(fancybox.$container.firstChild);
          }
    
          const $dataColumn = document.createElement("div");
          $dataColumn.classList.add("fancybox__rightCol");
    
          const $info = document.createElement("div");
          $dataColumn.appendChild($info);
          fancybox.$info = $info;
    
          fancybox.$container.appendChild(fancybox.$backdrop);
    
          fancybox.$container.appendChild($photoColumn);
          fancybox.$container.appendChild($dataColumn);
    
          fancybox.$leftCol = $photoColumn;
          fancybox.$rightCol = $dataColumn;
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