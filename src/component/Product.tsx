import {LuDollarSign} from 'react-icons/lu' ; 
import {MdArrowBackIosNew , MdArrowForwardIos} from 'react-icons/md'
import { product } from '../interfaces'
import Text from './Text';
interface Props { 
            product:product 
            loanAmount:string | number
            numberMonths:string | number 
            inputLoanAmountRef : any 
            inputNumberMonthsRef: any 
            totalAmount:string | number 
            monthlyInstallment:string | number 
            targetMonth: string | number 
            handlechangeLoanAmount:(value: string | number, product: product) => void
            handleChangeMonthNumber:(value: string | number, product: product) => void
            incrementMonths:() => void 
            decrementMonths:() => void 
}


const Product = ({product ,loanAmount ,numberMonths , inputLoanAmountRef ,inputNumberMonthsRef ,totalAmount,monthlyInstallment,targetMonth,handlechangeLoanAmount,handleChangeMonthNumber,incrementMonths,decrementMonths }:Props) => {
  return (
            <div className=' p-5'>       
            <div className='flex justify-between '>
            <div className='w-[55%] '>
            <div className='' >
            <label htmlFor="loanAmount">Loan Amount</label>
            </div>
            <div className='border appearance-none border-blue-50 flex items-center p-2 rounded'>
            <span className=''><LuDollarSign className='text-blue-100  '/></span>
            <input type="number"
            className='w-[80%] appearance-none outline-none'
            id="loanAmount"
            value={loanAmount}
            ref={inputLoanAmountRef} 
            onChange={()=>handlechangeLoanAmount(inputLoanAmountRef.current.value , product)}  
            />
            </div>
            </div>
            <div className=''>
            <div >
            <label htmlFor="numberMonths">number of months</label>
            </div>
            <div className='border appearance-none border-blue-50 flex items-center p-2 rounded'>
            <button className='w-1/5 '
            onClick={() => decrementMonths()}
            ><MdArrowBackIosNew/></button>
            <input
            className='outline-none w-3/5 ' 
            type="number" 
            id="numberMonths"
            value={numberMonths}
            ref={inputNumberMonthsRef}
            onChange={()=>handleChangeMonthNumber(inputNumberMonthsRef.current.value , product)}
            />
            <button className='w-1/5 flex justify-center items-center '
            onClick={() =>incrementMonths()}
            ><MdArrowForwardIos/></button>
            </div>
            </div>
            </div>
            <Text 
            totalAmount={totalAmount}
            monthlyInstallment={monthlyInstallment}
            targetMonth={targetMonth}
            numberMonths={numberMonths}
            loanAmount={loanAmount}
            />
</div>
  )
}

export default Product