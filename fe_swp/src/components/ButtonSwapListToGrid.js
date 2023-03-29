import { makeStyles } from "@mui/material";
import React, { useEffect } from "react";
import "../styles/ButtonSwap.css";

const Calendar = () => {

    useEffect(() => { 
        const gridListButtons = document.querySelectorAll('.grid-list-button');
        gridListButtons.forEach(button => {
            button.addEventListener('click', gridListToggle);
        });
    }, [])

    function gridListToggle() {
        let button = this;

        button.classList.add('animation');
        button.classList.toggle('list');

        let clone = button.cloneNode(true);
 
        button.parentNode.replaceChild(clone, button);
        clone.addEventListener('click', gridListToggle);
    }

    return (
        <div className="buttonSwapp">

            <button class="grid-list-button">
                <span class="icon">
                    <span class="dots">
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                    </span>
                    <span class="lines">
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                    </span>
                </span>
            </button>
        </div>
    );
};
export default Calendar;
