import { useLocation, Navigate } from "react-router-dom";
import BookInfoPanel from "../components/BookInfoPanel";
import "../style/BookPage.css";
import Navbar from "../components/Navbar";
import ReviewPanel from "../components/ReviewPanel";
import ReviewVisualizer from "../components/ReviewVisualizer";

export function BookPage(){
    const location = useLocation();
    const book = location.state?.book;

    if (!book) return <Navigate to="/HomePage" replace />;

    return (
        <>
            <Navbar/>
            <div className="sfondo-book-page">
                <div className="book-page-left-column">
                    <BookInfoPanel book={book} />
                    <ReviewPanel book={book} /> 
                </div>
                <ReviewVisualizer book={book}/>
            </div>
        </>
    );
}