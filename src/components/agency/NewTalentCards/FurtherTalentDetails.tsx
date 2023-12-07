import React, { useRef, useState } from 'react';
import { Card, CardContent } from '../../../ui/card';
import { Separator } from '../../../ui/seperator';
import { Textarea } from '../../../ui/textarea';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Progress } from '../../../ui/progress';
// import Image from 'next/image';
import { FaChevronRight } from 'react-icons/fa';
import darkUnion from '../../../assets/Union.png';
import subtract from '../../../assets/Subtract.png';
import subtract2 from '../../../assets/Subtract2.png';

export default function FurtherTalentDetails({
  next,
  cancel,
  overView,
  setOverView,
  create,
}: {
  create: () => void;
  next: () => void;
  cancel: () => void;
  overView: {
    summary: string;
    profilePic: any;
  };
  setOverView: any;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [inView, setInView] = useState<File>({} as File);
  const [inVw, setInVw] = useState(false);

  const handleDivClick = () => {
    // Trigger a click event on the hidden input
    fileInputRef?.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files?.length) {
      const selectedFile = Array.from(files);
      setOverView({
        ...overView,
        [name]: selectedFile[0],
      });
      setInVw(true);
    }
  };

  return (
    <div className=' bg-[#F3F3F3]/30   px-4 md:px-12 xl:px-40 min-h-[70svh] py-5'>
      <Card className='bg-white  h-[79vh] p-2 md:p-4 flex-col flex overflow-y-scroll'>
        <div className='flex justify-between font-medium text-[12px] my-2 '>
          <div className='relative text-white flex items-center justify-center '>
            <p className='absolute top-[25%]  z-20 text-[16px]'>Overview</p>
            <img src={darkUnion} alt='' className=' z-5 w-[300px] h-[50px]' />
          </div>
          <div className=' relative text-black flex items-center justify-center'>
            <p className='absolute top-[25%] text-[16px] z-20'>
              {' '}
              Personal Details
            </p>
            <img src={subtract} alt='' className=' z-10 w-[300px] h-[50px]' />
          </div>
          <div className=' relative text-black flex items-center justify-center'>
            <p className='absolute top-[25%] text-[16px] z-20'> Address</p>
            <img src={subtract} alt='' className=' z-10 w-[300px] h-[50px]' />
          </div>

          <div className=' relative text-black flex items-center justify-center'>
            <p className='absolute top-[15%] text-[14px] leading-4 z-20'>
              {' '}
              Education & <br /> Certification
            </p>
            <img src={subtract} alt='' className=' z-10 w-[300px] h-[50px]' />
          </div>

          <div className=' relative text-black flex items-center justify-center'>
            <p className='absolute top-[25%] text-[16px] z-20'> Experience</p>
            <img src={subtract} alt='' className=' z-10 w-[300px] h-[50px]' />
          </div>

          <div className=' relative text-black flex items-center justify-center'>
            <p className='absolute top-[15%] text-[14px] leading-4 z-20'>
              Skills &<br /> Opportunities
            </p>
            <img src={subtract} alt='' className=' w-[300px] h-[50px]' />
          </div>

          <div className=' relative text-black flex items-center justify-center'>
            <p className='absolute top-[25%] z-20 text-[16px]'> Socials</p>
            <img src={subtract2} alt='' className=' z-10 w-[300px] h-[50px]' />
          </div>
        </div>
        <CardContent className='border rounded-xl  p-8 flex-1 flex flex-col  mt-3'>
          <p>Show agencies the best version of yourself.</p>

          <Separator className=' my-3 bg-[#D7D8DA5C]' />
          <Input
            type='file'
            className='hidden'
            ref={fileInputRef}
            onChange={handleFileChange}
            name='profilePic'
          />

          <div
            onClick={handleDivClick}
            className='mt-3 border w-[156px] h-[156px] flex justify-center text-center items-center text-[18px] font-light text-[#93979DB2]'
          >
            Attach or drop photos here
          </div>

          {/* {inVw && (
            <div className='flex-1 flex  items-center bg-black/40 w-full h-full rounded-md'>
              <Image
                src={URL.createObjectURL(overView?.profilePic)}
                alt=''
                width={400}
                height={250}
                className='min-w-16 min-h-16 max-h-[40vh] md:max-h-[400px] sm:max-h-[50vh] w-full mx-auto object-contain rounded-md'
                style={{ height: 120 }}
              />
            </div>
          )} */}

          <p className='text-[13px] font-light mb-3'>
            Attach as many photos as possible.
          </p>
          <Separator
            className='py-[2px] my-7 bg-[#D7D8DA]
'
          />
          <p className='text-[12px] font-light'>
            Use this space to show agencies you have the skills and experience
            they are looking for. Keep it short and make sure it is error free.
          </p>
          <Separator className=' my-7  bg-[#D7D8DA5C]' />
          <Textarea
            className='flex-1 min-h-[300px] rounded-lg p-3 border border-[#E5E5E5]'
            placeholder='Summarise your strength and skills'
            value={overView.summary || ''}
            onChange={(e) =>
              setOverView({ ...overView, summary: e.target.value })
            }
          />
          <small className='text-[10px]'>250 characters</small>
        </CardContent>
        <Progress value={14} className='my-2 md:my-5' />

        <div className='flex flex-col md:flex-row justify-between gap-4'>
          <Button className='light__btn md:max-w-[100px]' onClick={cancel}>
            Close
          </Button>
          <div className='flex gap-4 flex-col md:flex-row'>
            <Button className='light__btn' onClick={create}>
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
      </Card>
    </div>
  );
}
