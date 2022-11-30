import React from "react";
import { useParams } from "react-router-dom";
const QuoteDetails = () => {
    const { id } = useParams();

    return (
        <h1>Quote id: {id}</h1>
    )
}
export default QuoteDetails;