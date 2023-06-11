interface Props { 
            loanAmount:string | number
            numberMonths:string | number 
            totalAmount:string | number 
            monthlyInstallment:string | number 
            targetMonth: string | number 
}
const Text = ({totalAmount ,monthlyInstallment ,targetMonth , numberMonths , 
            loanAmount}:Props) => {
            const addMonthsToDate = (number:number):string=> {
                        const currentDate = new Date();
                        const futureDate = new Date();
                        futureDate.setMonth(currentDate.getMonth() + number);
                        
                        const monthNames = [
                          "January", "February", "March", "April", "May", "June", "July",
                          "August", "September", "October", "November", "December"
                        ];
                        
                        const monthName = monthNames[futureDate.getMonth()];
                        const year = futureDate.getFullYear();
                        
                        return `${monthName} ${year}`;
                      }
  return (
    <div className='m-5 mx-auto mt-4 border border-blue-50 rounded '>
            <div className='flex justify-around items-center border-b border-b-blue-50 p-2'>
                        <h6>Monthly amount</h6>
                        <p className='text-3xl font-bold text-blue-500  '>${parseInt(monthlyInstallment.toString())}</p>
            </div>
            <div>
                        <p className='text-sm p-3 bg-blue-50 text-center'>
                                    you're planinng {numberMonths} <span className='font-bold'>monthly deposits</span> to reach your <span className='font-bold'>${loanAmount}</span> goal by <span className='font-bold'>{addMonthsToDate(parseInt(targetMonth.toString()))}</span> the total amount loaned will be <span className='font-bold'>${parseFloat(totalAmount.toString()).toFixed(2)}</span>
                        </p>
            </div>
    </div>
  )
}

export default Text