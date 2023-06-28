import React from "react";

export const AddBookmarkIcon = ({ width = "24", height = "24", fill = "#313037" }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19 22C18.795 22 18.592 21.937 18.419 21.813L12 17.229L5.581 21.813C5.277 22.032 4.875 22.062 4.542 21.89C4.209 21.718 4 21.375 4 21V5C4 3.346 5.346 2 7 2H17C18.654 2 20 3.346 20 5V21C20 21.375 19.791 21.718 19.458 21.89C19.313 21.963 19.156 22 19 22Z"
                fill={fill}
            />
        </svg>
    )
}


