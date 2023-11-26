import React, { useRef, useState } from 'react';
import { Card, CardContent } from '../../../ui/card';
import { Separator } from '../../../ui/seperator';
import { Textarea } from '../../../ui/textarea';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Progress } from '../../../ui/progress';
// import Image from 'next/image';
import { FaChevronRight } from 'react-icons/fa';

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
    <div className=' bg-[#F3F3F3]/30   px-4 md:px-12 xl:px-40 min-h-[70vh] py-10'>
      <Card className='bg-white  h-full p-2 md:p-4 flex-col flex '>
        <div className='flex lg:justify-between font-medium text-[12px] my-2 flex-wrap bg-blue-100'>
          {/* <p className='bg-black text-white p-2 rounded lg:p-4'>Overview</p> */}
          <div className="relative p-2 bg-green-200">
            <p className='text-black  p-2  z-10 lg:p-4'>Overview</p>


          </div>
          <p className='bg-[#D7D8DA] border border-bm__btn__grey p-2 rounded lg:p-4 '>
            Personal Details
          </p>
          {/* <FaChevronRight className={'text-[48px] p-0 m-0  max-w-[20px] h-[48px]'} /> */}
          <p className='bg-[#D7D8DA] border border-bm__btn__grey p-2 rounded lg:p-4 '>
            Address
          </p>
          <p className='bg-[#D7D8DA] border border-bm__btn__grey p-2 rounded lg:p-4 '>
            Education & Certification
          </p>
          <p className='bg-[#D7D8DA] border border-bm__btn__grey p-2 rounded lg:p-4 '>
            Experience
          </p>
          <p className='bg-[#D7D8DA] border border-bm__btn__grey p-2 rounded lg:p-4 '>
            Skills & Opportunities
          </p>
          <p className='bg-[#D7D8DA] border border-bm__btn__grey p-2 rounded lg:p-4 '>
            Socials
          </p>
        </div>
        <CardContent className='border rounded-xl  p-3 flex-1 flex flex-col  mt-3'>
          <p>Show agencies the best version of yourself.</p>

          <Separator className=' my-3' />
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
          <Separator className='py-[2px] my-3' />
          <p className='text-[12px] font-light'>
            Use this space to show agencies you have the skills and experience
            they are looking for. Keep it short and make sure it is error free.
          </p>
          <Separator className=' my-3' />
          <Textarea
            className='flex-1 min-h-[300px]'
            placeholder='Summarise your strength and skills'
            value={overView.summary || ''}
            onChange={(e) =>
              setOverView({ ...overView, summary: e.target.value })
            }
          />
          <small className='text-[10px]'>250 characters</small>
        </CardContent>
        <Progress value={14} className='my-2 md:my-7' />

        <div className='flex flex-col md:flex-row justify-between mt-2 gap-4'>
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
