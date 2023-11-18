import drago from '../../../assets/drago.jpg';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { Separator } from '../../../ui/seperator';

import {
  BiChevronLeft,
  BiChevronRight,
  BiChevronsLeft,
  BiChevronsRight,
  BiSortAlt2,
} from 'react-icons/bi';
// import { BsFilter } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../ui/dropdown-menu';
import { Input } from '../../../ui/input';
import { AiOutlineSearch } from 'react-icons/ai';

const card_content = {
  isCurrent: false,
  content: [1, 2, 3, 4, 5],
};

export default function AvailableProjects({}) {
  return (
    <Card className='p-2 md:p-4 bg-white'>
      <CardHeader className='flex-row p-1 justify-between items-center '>
        <CardTitle className=''>
          <p className='font-medium text-[15px] whitespace-nowrap '>
            Available Projects
          </p>
        </CardTitle>

        <div className='flex gap-4 text-bm_black/75 text-[10px] whitespace-nowrap'>
          <div className=''>View all projects </div>
          <div className='flex gap-4 text-bm_black/75 text-[14px]'>
            <BiChevronRight />
          </div>
        </div>
      </CardHeader>
      <Separator className='my-2 bg-[#D7D8DA]' />

      <CardHeader className='flex-row p-1 justify-between items-center'>
        <div className='flex w-full justify-start items-center text-[12px]'>
          <div className='hidden lg:flex items-center border-0 rounded-md w-full px-3 mr-3 md:mr-6 max-w-[400px]'>
            <p>Filter :{'   '}</p>
            <Input
              className='focus:border-0 focus:ring-0 focus:outline-none border ml-2 max-w-[300px] h-[24px] px-[6px] py-[14px]'
              placeholder='Search'
            />
          </div>
          <div className='flex gap-4 text-bm_black/75 text-[10px] whitespace-nowrap flex-1'>
            <DropdownMenu>
              <DropdownMenuTrigger className='flex gap-1 items-center'>
                <BiSortAlt2 />
                Sort: {'  '}Relevance
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-white p-3'>
                <DropdownMenuItem className='hover:bg-black/10  text-[16px]'>
                  Relevance
                </DropdownMenuItem>
                <DropdownMenuSeparator className='bg-bm__beige' />
                <DropdownMenuItem className='hover:bg-black/10  text-[16px]'>
                  Salary
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className='flex gap-4 text-bm_black/75 text-[10px] whitespace-nowrap'>
            <div className=''>1 - 5 of 750 </div>

            <div className='flex gap-4 text-bm_black/75 text-[14px]'>
              <BiChevronLeft />
              <BiChevronsLeft />
              <BiChevronsRight />
              <BiChevronRight />
            </div>
          </div>
        </div>
      </CardHeader>
      <Separator className='my-2 bg-[#D7D8DA]' />

      {card_content.content.map((_, idx) => {
        return (
          <div key={idx}>
            <CardContent className='p-0 space-y-1'>
              <div className='flex space-x-2'>
                <img src={drago} alt='' width={18} height={18} />
                <p className='border-r px-2 text-[12px]'>Cool Ltd.</p>
                <p className='text-bm__ox__red text-[10px]'>
                  Closes on 25th Nov. 2023
                </p>
              </div>
              <h3 className='font-medium text-[15px] '>Project Name</h3>
              <p className='font-normal text-[10px] text-[#252525]'>
                This is the project description.. this is the project
                description
              </p>
              {card_content.isCurrent && (
                <div className='flex md:space-x-2 text-bm__niv text-[10px] font-medium items-center flex-wrap'>
                  <div className=''>ID: NIV020 </div>
                  <div className='text-[16px] p-0  pb-2 px-2'>.</div>
                  <div className=''> Outlet: Shoprite Ikeja</div>
                  <div className='text-[16px] p-0  pb-2 px-2'>.</div>
                  {/* <br className="block md:hidden" /> */}

                  <div className=''>Supervisor: Adenekan Shoneye </div>
                </div>
              )}
            </CardContent>
            <CardFooter className='mt-3 p-0 md:gap-6 flex-col sm:flex-row  sm:items-end'>
              <div className='flex md:space-x-2 text-bm__grey__text text-[10px] h-full flex-wrap  '>
                <div className=''>Mon, Wed, Fri {'  '}</div>
                <div className='text-[11px] p-0  pb-1 px-1'>.</div>

                <div className=''>Nov 30 - December 30</div>
                <div className='text-[11px] p-0  pb-1 px-1'>.</div>
                <div className=''>Lagos, Abuja, Ogun, Plateau</div>
              </div>
              {!card_content.isCurrent && (
                <button className='dark__btn max-w-fit text-[12px] mt-2 '>
                  Apply
                </button>
              )}
              {card_content.isCurrent && (
                <button className='ox__btn max-w-fit text-[12px] mt-2'>
                  Add Report
                </button>
              )}
            </CardFooter>
            <Separator className='my-2 bg-[#D7D8DA]/60' />
          </div>
        );
      })}
    </Card>
  );
}
