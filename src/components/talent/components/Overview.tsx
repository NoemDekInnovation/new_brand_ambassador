import React from 'react';
import { Card, CardContent } from '../../../ui/card';
// import { Separator } from '../../../ui/separator';
// import { Textarea } from '../../../ui/textarea';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
// import { Progress } from '@/components/ui/progress';
import { Separator } from '../../../ui/seperator';

export default function Overview({
  next,
  cancel,
  overView,
  setOverView,
}: {
  next: () => void;
  cancel: () => void;
  overView: {};
  setOverView: React.Dispatch<React.SetStateAction<{}>>;
}) {
  return (
    <div className=' bg-[#F3F3F3]/30   px-4 md:px-12 xl:px-40 min-h-[70vh] py-10  '>
      <Card className='bg-white  h-full p-2 md:p-4  flex justify-between gap-[24px]'>
        <Card className=' p-6 flex flex-col justify-center gap-2  border-bm__beige w-[240px] max-h-[189px] border rounded-[6px]'>
          <p className='text-[15px] font-medium'>My Account</p>
          <Separator className='bg-bm__gler' />
          <p className='text-[12px] font-normal'>Profile</p>
          <Separator className='bg-bm__gler/50' />

          <p className='text-[12px] font-normal'>Billings & Payments</p>
          <Separator className='bg-bm__gler/50' />

          <p className='text-[12px] font-normal'>Settings</p>
        </Card>
        <div className=''>
          <div className='flex justify-between font-medium text-[12px] my-2'>
            <p className='bg-black text-white p-4'>Overview</p>
            <p className='bg-[#D7D8DA] border border-bm__btn__grey p-4 '>
              Personal Details
            </p>
            <p className='bg-[#D7D8DA] border border-bm__btn__grey p-4 '>
              Address
            </p>
            <p className='bg-[#D7D8DA] border border-bm__btn__grey p-4 '>
              Education & Certification
            </p>
            <p className='bg-[#D7D8DA] border border-bm__btn__grey p-4 '>
              Experience
            </p>
            <p className='bg-[#D7D8DA] border border-bm__btn__grey p-4 '>
              Skills & Opportunities
            </p>
            <p className='bg-[#D7D8DA] border border-bm__btn__grey p-4 '>
              Socials
            </p>
          </div>
          <CardContent className='border rounded-xl  p-3 flex-1 flex flex-col  mt-3'>
            <p>Show agencies the best version of yourself.</p>

            <Separator className=' my-3' />
            <Input type='file' className='hidden' />
            <div className='mt-3 border w-[156px] h-[156px] flex justify-center text-center items-center text-[18px] font-light text-[#93979DB2]'>
              Attach or drop photos here
            </div>
            <p className='text-[13px] font-light mb-3'>
              Attach as many photos as possible.
            </p>
            <Separator className='py-[2px] my-3' />
            <p className='text-[12px] font-light'>
              Use this space to show agencies you have the skills and experience
              they are looking for. Keep it short and make sure it is error
              free.
            </p>
            <Separator className=' my-3' />
            {/* <Textarea
            className='flex-1 min-h-[300px]'
            placeholder='Summarise your strength and skills'
          /> */}
            <small className='text-[10px]'>250 characters</small>
          </CardContent>
          {/* <Progress value={14} className='my-2 md:my-7' /> */}

          <div className='flex justify-between mt-2'>
            <Button className='light__btn max-w-[100px]' onClick={cancel}>
              Close
            </Button>
            <div className='flex gap-4'>
              <Button className='light__btn' onClick={next}>
                Create
              </Button>
              <Button
                className='dark__btn w-fit whitespace-nowrap'
                onClick={next}
              >
                Save and Next
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
