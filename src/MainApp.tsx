import axios from 'axios'
import  { useEffect, useRef, useState } from 'react'
import { product } from './interfaces';
import Product from './component/Product';
const initial_product_value:product = {
    "id": "",
    "interest": "",
    "name": "",
    "min_amount": "",
    "max_amount": "",
    "min_tenure": "",
    "max_tenure": "",
    "image": ""
}
const MainApp = () => {
  // states
  const [data , setdata] = useState<product[]>([]) ;  
  const [product ,setproduct] = useState<product>(initial_product_value) ;
  const [loanAmount ,setloanAmount]=useState<number | string>(0) ;
  const [numberMonths , setNumberMonths] = useState<number | string>(0);

  const [totalAmount , settotalAmount] =useState<number | string>(0);
  const [monthlyInstallment , setmonthlyInstallment] = useState<number | string>(0);
  const [targetMonth , settargetMonth] = useState<number | string>(0);
  // reference
  const inputLoanAmountRef = useRef(null) ; 
  const inputNumberMonthsRef = useRef(null) ;

  // variables 
  const productChoosed  = product.id !== ""  ;
  // functions 
  const chooseProduct = (product:product) => {
    setproduct(product) ; 
  }
  const resetLoanAmount = (product:product) => {
    setloanAmount(product.min_amount) ; 
  }
  const resetMonths = (product:product) => {
    setNumberMonths(product.min_tenure)
  }
  const handlechangeLoanAmount = (value:string | number  , product:product):void => {
    let newValue = parseFloat(value.toString()) ; 
    console.log({value:newValue })
    if(isNaN(newValue) ) {
      setloanAmount(product.min_amount) ;
      return
    }
    if(newValue > parseFloat(product.max_amount.toString())){
      setloanAmount(product.max_amount) ;
      return  
    }
    if(newValue < parseFloat(product.min_amount.toString())){
      setloanAmount(product.min_amount) ;
      return
    }
    setloanAmount(newValue) ; 
  }
  const handleChangeMonthNumber = (value:string | number  , product:product):void => {
    let newValue = parseFloat(value.toString()) ; 
    console.log({value:newValue })
    if(isNaN(newValue)) {
      setNumberMonths(product.min_tenure) ;
      return
    }
    if(newValue >= parseInt(product.max_tenure.toString())){
      setNumberMonths(product.max_tenure) ;
      return  
    }
    if(newValue <= parseInt(product.min_tenure.toString())){
      setNumberMonths(product.min_tenure) ;
      return
    }

    setNumberMonths(newValue) ; 
  }
  const incrementMonths = ():void => {
    if(productChoosed){
      if(parseInt(numberMonths.toString()) >= parseInt(product.max_tenure.toString())){
        setNumberMonths(parseInt(product.max_tenure.toString()) ) ;
        return  
      }
      setNumberMonths(parseInt(numberMonths.toString()) + 1 ) ; 
    }
  }
  const decrementMonths = ():void => {
    console.log("donee!")
    if(parseInt(numberMonths.toString()) <= parseInt(product.min_tenure.toString())){
      setNumberMonths(parseInt(product.min_tenure.toString())) ;
      return
    }
    setNumberMonths(parseInt(numberMonths.toString()) - 1 ) ; 
  }
  // useEffects 
  useEffect(()=>{
    axios("../public/products.json")
    .then(resp => setdata(resp.data))
    .catch(err => console.log(err)) 
  },[])

  useEffect(()=>{
    if(productChoosed){
      resetLoanAmount(product) ;
      resetMonths(product)
    }
  },[product])
  console.log(product);
  
  useEffect(()=>{
    if(productChoosed){
    const numberloanAmount:number = parseFloat(loanAmount.toString()) ;
    const numberofMonths:number = parseFloat(numberMonths.toString()) 
    const newtotalAmount = numberloanAmount + numberloanAmount * parseFloat(product.interest.toString());
    settotalAmount(newtotalAmount) ; 
    const newmonthlyInstallment = newtotalAmount / numberofMonths;
    setmonthlyInstallment(newmonthlyInstallment) ; 
    const currentMonth = 0; 
    const newtargetMonth = currentMonth + numberofMonths;
    console.log({newtargetMonth})
    settargetMonth(newtargetMonth) ; 
    }
  },[product,loanAmount ,numberMonths ])

  return (
      <div className=' lg:h-auto md:h-auto w-full mx-auto md:w-[60%] lg:w-[50%] '>
        <p className='text-blue-700 font-normal text-center p-2'>let's plan your <span className=' text-blue-900 font-bold'>loan</span>.</p>
        <div className='bg-white drop-shadow-xl p-8 rounded-lg'>
            <div className='flex w-[60%] mx-auto justify-between'>
              {
                data.map((v,i)=><img
                className='w-[50px] md:w-[75px]  lg:w-[75px] rounded '
                key={i}  
                src={v.image}  
                onClick={() =>chooseProduct(v)}/>)
              } 
            </div>

              {productChoosed && 
              <Product
              {...product}
              product={product} 
              loanAmount={loanAmount}
              numberMonths={numberMonths}
              inputLoanAmountRef={inputLoanAmountRef}
              handlechangeLoanAmount={handlechangeLoanAmount  }
              inputNumberMonthsRef={inputNumberMonthsRef}
              handleChangeMonthNumber={handleChangeMonthNumber}
              totalAmount={totalAmount}
              monthlyInstallment={monthlyInstallment}
              targetMonth={targetMonth} 
              incrementMonths={incrementMonths}
              decrementMonths={decrementMonths}
              />}
        </div>
    </div>
      
            )
}

export default MainApp