import React, {useState} from 'react';
import './Slider.css';
import ReactPaginate from 'react-paginate';
import sliderJsonData from './SLIDER_MOCK_DATA.json';

const Slider = () => {
    const [slideData, setSlideData] = useState(sliderJsonData);
    const [currentSlideNumber, setCurrentSlideNumber] = useState(0);

    const dataPerSlide = 1;
    const dataSeen = currentSlideNumber * dataPerSlide;

    const checkLength = (content) => {
        if(content.length > 75){
            return content.substring(0,75) + '...';
        }else{
            return content;
        }
    }

    const displayData = () => {
        const elm = slideData.slice(dataSeen, dataSeen + dataPerSlide)
        .map((data)=>{
            return(
                <div className="slider" key={data.id}>
                    <div className="sliderImg">
                        <img src={data.image}/>
                    </div>
                    <div className="sliderText">
                        <h2 className="sliderHeading">{data.title}</h2>
                        <h3 className="sliderCategory">{data.category.join(' . ')}</h3>
                        <p className="sliderDesc">
                            {checkLength(data.description)}
                        </p>
                        <div className="priceDetails">
                            <h5>{data['price-desc']}</h5>
                            <h2>${data.price}</h2>
                        </div>
                    </div>
                </div>
            )
        })
        return elm;
    }

    const pageCount = Math.ceil(slideData.length / dataPerSlide);
    const changeSlide = ({selected}) => {
        setCurrentSlideNumber(selected);
    }

    return(
        <div className="slider-pagination">
            {displayData()}

            <ReactPaginate 
            previousLabel = {"Previous"}
            nextLabel = {"Next"}
            pageCount = {pageCount}
            onPageChange = {changeSlide}
            containerClassName = {"paginationBttns"}
            previousLinkClassName = {"previousBttn"}
            nextLinkClassName = {"nextBttn"}
            disabledClassName = {"paginationDisabled"}
            activeClassName = {"paginationActive"}
        />
        </div>
    )
}

export default Slider;