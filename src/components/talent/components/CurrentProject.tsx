import drago from '../../../assets/drago.jpg';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { Separator } from '../../../ui/seperator';

export const CurrentProject = () => {
  return (
    <Card className='p-2 md:p-4 bg-white'>
      <CardHeader className='flex-row p-1 justify-between items-center'>
        <CardTitle>
          <p className='font-medium text-[15px] whitespace-nowrap'>
            Current Project
          </p>
        </CardTitle>
      </CardHeader>

      <div>
        <Separator className='my-2 bg-[#D7D8DA]' />
        <CardContent className='p-0 space-y-1'>
          <div className='flex space-x-2'>
            <img src={drago} alt='' width={18} height={18} />
            <p className='px-2 text-[12px] text-[#252525B2] font-medium'>
              Cool Ltd.
            </p>
          </div>
          <h3 className='font-medium text-[15px] '>Project Name</h3>
          <p className='font-normal text-[10px] text-[#252525]'>
            This is the project description.. this is the project description
          </p>

          <div className='flex md:space-x-2 text-bm__niv text-[10px] font-black items-center flex-wrap'>
            <div className=''>ID: NIV020 </div>
            <div className='text-[16px] p-0  pb-2 px-2'>.</div>
            <div className=''> Outlet: Shoprite Ikeja</div>
            <div className='text-[16px] p-0  pb-2 px-2'>.</div>
            {/* <br className="block md:hidden" /> */}

            <div className=''>Supervisor: Adenekan Shoneye </div>
          </div>
        </CardContent>
        <CardFooter className='mt-1 p-0 md:gap-6 flex-col sm:flex-row  sm:items-end'>
          <div className='flex md:space-x-2 text-bm__grey__text text-[8px] h-full flex-wrap  '>
            <div className=''>Mon, Wed, Fri {'  '}</div>
            <div className='text-[11px] p-0  pb-1 px-1'>.</div>

            <div className=''>Nov 30 - December 30</div>
            <div className='text-[11px] p-0  pb-1 px-1'>.</div>
            <div className=''>Lagos, Abuja, Ogun, Plateau</div>
          </div>

          <button className='ox__btn max-w-fit text-[12px] mt-2'>
            Add Report
          </button>
        </CardFooter>
      </div>
    </Card>
  );
};
