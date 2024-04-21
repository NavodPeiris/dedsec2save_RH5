import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";


const handleChatBtnClick = () => {
    if (!isButtonDisabled) {
      toast.info("Experiencing high traffic, Please wait a moment.", {
        position: toast.POSITION.TOP_CENTER,
        onOpen: () => setIsButtonDisabled(true),
        onClose: () => setIsButtonDisabled(false),
      });
    }
  };

function Floatingb() {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    return (
        <div className="fixed bottom-4 right-4">
        <button
        className="navbar-btn"
        type="button"
        disabled={isButtonDisabled}
        onClick={handleChatBtnClick}
        >

        <FontAwesomeIcon icon={faCommentDots} /> Live Chat
        </button>
        </div>
    );
}

export default Floatingb;