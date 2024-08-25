"use client";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import React, { use, useEffect, useRef, useState } from "react";
import preview from "~/assets/preview-section.svg";
import empty from "~/assets/empty.svg";
import emptyM from "~/assets/emptyM.svg";
import ProfileSkeleton from "~/components/profileSkeleton";
import { Button } from "~/components/ui/button";
import Preview from "~/components/common/preview";
import { db, UserDetails } from "~/lib/dexie";
import { auth } from "~/lib/request";
import { handleAuthStateChanged, setDataFromDb } from "~/lib/fetchData";

type Props = {};

const LinkPage = (props: Props) => {
  const [userDetails, setUserDetail] = useState<UserDetails>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [editFormIsOpen, setEditFormIsOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      const profilePhotoFromDb = await db.bio.get("profilePhoto");
      if (profilePhotoFromDb && profilePhotoFromDb.value) {
        setProfilePhoto(profilePhotoFromDb.value as string);
      }
      setIsLoading(false);
    };

    fetchProfilePhoto();
  }, []);

  useEffect(() => {
    const authListener = handleAuthStateChanged(
      setUserDetail,
      setProfilePhoto,
      async () => {
        const userEmail = auth.currentUser?.email; // Get the email from Firebase auth
        await setDataFromDb(setUserDetail, setProfilePhoto, userEmail);
      }
    );

    return () => authListener();
  }, []);
  const editForm = <div></div>;
  return (
    <div className='flex flex-col lg:flex-row gap-6'>
      <div className='p-6 bg-white rounded-xl min-w-[560px] hidden xl:flex items-center justify-center '>
        <Image className='relative ' src={preview} alt={"preview"} />
        <div className='absolute hidden xl:block'>
          {isLoading ? (
            <ProfileSkeleton />
          ) : (
            <Preview
              img={profilePhoto}
              firstName={userDetails.firstName}
              lastName={userDetails.lastName}
              email={userDetails.email}
            />
          )}
        </div>
      </div>
      <div className='bg-white w-auto p-10 pt-12 rounded-xl flex flex-col md:gap-6 gap-10'>
        <div className='flex flex-col gap-2'>
          <h1 className='head-m md:heading-m'>Customize your links</h1>
          <p className='body-m text-secondary-foreground'>
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          <Button className='mt-8 heading-s w-full' variant='outline'>
            <PlusIcon size={16} />
            {"Add new link"}
          </Button>
        </div>
        <div className='w-full bg-background-foreground flex flex-col  justify-center items-center rounded-xl p-5 md:py-[80px] '>
          <Image className='hidden md:block' src={empty} alt='' />
          <Image className='md:hidden' src={emptyM} alt='' />
          <div className='text-center space-y-3 md:space-y-10 md:mt-10 mt-3'>
            <h1 className='head-m md:heading-m text-center '>
              {"Let's get you started"}
            </h1>
            <p className='text-center body-m text-secondary-foreground'>
              Use the “Add new link” button to get started. Once you have more
              than one link, you can reorder and edit them. We’re here to help
              you share your profiles with everyone!
            </p>
          </div>
        </div>
        <div className=' flex md:place-content-end mt-5 md:mt-0'>
          <Button
            className='md:w-[91px] opacity-60 w-full '
            variant={"default"}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LinkPage;
