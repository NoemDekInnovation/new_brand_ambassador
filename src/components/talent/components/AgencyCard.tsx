import { AiOutlineMore } from 'react-icons/ai';
import drago from '../../../assets/drago.jpg';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../ui/dropdown-menu';
import { Separator } from '../../../ui/seperator';
import { Link } from 'react-router-dom';
import { HiOutlineArrowSmRight } from 'react-icons/hi';

export function AgencyCard({
  card_title,
  card_width,
}: {
  card_width?: string;
  card_title: string;
}) {
  return (
    <Card className={`p-2 md:p-4 bg-white  w-[240px] ${card_width}`}>
      <CardHeader className='flex-row p-1 justify-between items-center'>
        <div className='flex space-x-3'>
          <CardTitle className=''>
            <p className='font-medium text-[15px] '>{card_title}</p>
          </CardTitle>
          <span className='text-white bg-bm__ox__red text-[10px] p-0 px-2 rounded-md'>
            25
          </span>
        </div>
        <div className='flex gap-4 text-bm_black/75 text-[14px]'>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <AiOutlineMore />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-white p-3'>
              <DropdownMenuItem className='hover:bg-black/10'>
                Relevance
              </DropdownMenuItem>
              <DropdownMenuSeparator className='bg-bm__beige' />
              <DropdownMenuItem className='hover:bg-black/10'>
                Favorites{' '}
              </DropdownMenuItem>
              <DropdownMenuSeparator className='bg-bm__beige' />
              <DropdownMenuItem className='hover:bg-black/10'>
                Top Rated
              </DropdownMenuItem>
              <DropdownMenuSeparator className='bg-bm__beige' />
              <DropdownMenuItem className='hover:bg-black/10'>
                Top paying
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <Separator className='my-2 bg-bm__beige' />

      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, idx) => {
        return (
          <div className='' key={idx}>
            <CardContent className='p-0 space-y-1'>
              <div className='flex space-x-2'>
                <img src={drago} alt='' width={18} height={18} />
                <p className='px-2 text-[12px]'>Cool Ltd.</p>
              </div>
            </CardContent>

            {idx !== 9 && <Separator className='my-2 bg-bm__beige' />}
          </div>
        );
      })}
      <Separator className='my-2' />
      <CardFooter className='mt-3 p-0 gap-6  flex justify-center text-[10px] w-full'>
        <Link to={''} className='flex items-center space-x-2'>
          <p>See all agencies</p> <HiOutlineArrowSmRight />
        </Link>
      </CardFooter>
    </Card>
  );
}
