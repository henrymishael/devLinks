import Image from "next/image";
import React, { useEffect, useState } from "react";
import { db, UserDetails } from "~/lib/dexie";
import { handleAuthStateChanged, setDataFromDb } from "~/lib/fetchData";
import { auth } from "~/lib/request";

const Preview = ({ img, firstName, lastName, email }: any) => {
  return (
    <div className='flex flex-col gap-14'>
      <div className='flex flex-col gap-[25px] items-center'>
        <Image
          className='w-[96px] h-[96px] rounded-full border-4 border-primary'
          src={img}
          alt=''
          width='96'
          height='96'
        />

        <div className='flex flex-col gap-[13px] items-center justify-center '>
          <div className='heading-medium min-w-[160px] h-[16px] flex items-center justify-center'>
            {firstName} {lastName}
          </div>
          <div className='body-medium w-[72px] h-[8px] flex items-center justify-center text-secondary-foreground'>
            {email}{" "}
          </div>
        </div>
      </div>
      <div className='space-y-5'>
        <div className='w-[237px] h-[44px]'> </div>
        <div className='w-[237px] h-[44px]'> </div>
        <div className='w-[237px] h-[44px]'> </div>
        <div className='w-[237px] h-[44px]'> </div>
        <div className='w-[237px] h-[44px]'> </div>
      </div>
    </div>
  );
};

export default Preview;
