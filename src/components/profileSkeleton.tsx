import React from "react";
import { Skeleton } from "./ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className='flex flex-col gap-14'>
      <div className='flex flex-col gap-[25px] items-center'>
        <Skeleton className='w-[96px] h-[96px] rounded-full' />

        <div className='flex flex-col gap-[13px] items-center justify-center'>
          <Skeleton className='w-[160px] h-[16px]' />
          <Skeleton className='w-[72px] h-[8px]' />
        </div>
      </div>
      <div className='space-y-5'>
        <Skeleton className='w-[237px] h-[44px]' />
        <Skeleton className='w-[237px] h-[44px]' />
        <Skeleton className='w-[237px] h-[44px]' />
        <Skeleton className='w-[237px] h-[44px]' />
        <Skeleton className='w-[237px] h-[44px]' />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
