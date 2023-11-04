import "./StarRate.css";
import { useState, useEffect } from "react";

function StarRate(props) {

    const AVR_RATE = 50;

    const [starRate, setStarRate] = useState('');

    const STAR_IDX_ARR = ['first', 'second', 'third', 'fourth', 'last'];

    const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);

    const calcStarRates = () => {
        let tempStarRatesArr = [0, 0, 0, 0, 0];
        let starVerScore = (AVR_RATE * 70) / 100;
        let idx = 0;
        while (starVerScore > 14) {
            tempStarRatesArr[idx] = 14;
            idx += 1;
            starVerScore -= 14;
        }
        tempStarRatesArr[idx] = starVerScore;
        return tempStarRatesArr;
    };

    useEffect(() => {
        setRatesResArr(calcStarRates)
    }, [])

    const handleStarClick = (idx) => {

        if (props.isChangeable) {
            // When a star is clicked, we fill all stars up to and including the clicked one
            let newRates = Array(5).fill(0);
            for (let i = 0; i <= idx; i++) {
                newRates[i] = 14;
            }
            setRatesResArr(newRates);
    
            let count = newRates.filter(value => value === 14).length;
    
            props.getStarRate(count);
        }
        else {

        }
    };



    return (
        <div class="starRate">
            {STAR_IDX_ARR.map((item, idx) => {
                return <span className='star_icon' key={`${item}_${idx}`} onClick={() => handleStarClick(idx)}>
                    <svg xmlns='http://www.w3.org/2000/svg' width='40' height='39' viewBox='0 0 14 13' fill='#cacaca'>
                        <clipPath id={`${item}StarClip`}>
                            <rect width={`${ratesResArr[idx]}`} height='39' />
                        </clipPath>
                        <path
                            id={`${item}Star`}
                            d='M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z'
                            transform='translate(-2 -2)'
                        />
                        <use clipPath={`url(#${item}StarClip)`} href={`#${item}Star`} fill='#966fd6'
                        />
                    </svg>
                </span>
            })
            }
        </div>
    )
}

export default StarRate;
