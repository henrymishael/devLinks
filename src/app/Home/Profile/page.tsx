"use client";
import React, { useEffect, useRef, useState } from "react";
import { ImageIcon, PlusIcon } from "lucide-react";
import Image from "next/image";

import preview from "~/assets/preview-section.svg";
import img from "~/assets/img.svg";
import img2 from "~/assets/white.svg";
import ProfileSkeleton from "~/components/profileSkeleton";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/common/Input";
import { db, UserDetails } from "~/lib/dexie";
import { useLiveQuery } from "dexie-react-hooks";
type Props = {};

interface Bio {
  firstName?: string;
  lastName?: string;
  email?: string;
  value?: any; // To handle other possible properties
}

const Profile = (props: Props) => {
  const [userDetails, setUserDetail] = useState<UserDetails>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [editFormIsOpen, setEditFormIsOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setDataFromDb = async () => {
    const userDetailsFromDb = await db.bio.get("info");
    const profilePhotoFromDb = await db.bio.get("profilePhoto");

    if (userDetailsFromDb && userDetailsFromDb.value) {
      setUserDetail(userDetailsFromDb.value as any);
    }
    if (profilePhotoFromDb && profilePhotoFromDb.value) {
      setProfilePhoto(profilePhotoFromDb.value as string);
    }
  };

  const updateUserDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedDetails = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
    };
    setUserDetail(updatedDetails);

    await db.bio.put({
      key: "info",
      value: updatedDetails,
    });
    setEditFormIsOpen(false);
  };

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

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const newProfilePhoto = reader.result as string;
        setProfilePhoto(newProfilePhoto);
        await db.bio.put({ key: "profilePhoto", value: newProfilePhoto });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    setDataFromDb();
  }, []);

  const editForm = (
    <form className='flex flex-col gap-3' onSubmit={updateUserDetails}>
      <div className='flex flex-row items-center justify-between'>
        <label
          className='w-[240px] body-m text-secondary-foreground'
          htmlFor='firstName'
        >
          First name*
        </label>
        <input
          name='firstName'
          type='text'
          defaultValue={userDetails?.firstName}
          placeholder='e.g. John'
          className='px-4 py-3 w-full border rounded-lg focus:outline-primary caret-primary'
        />
      </div>
      <div className='flex flex-row items-center justify-between'>
        <label
          className='w-[240px] body-m text-secondary-foreground'
          htmlFor='lastName'
        >
          Last name*
        </label>
        <input
          name='lastName'
          type='text'
          defaultValue={userDetails?.lastName}
          placeholder='e.g. Appleseed'
          className='px-4 py-3 w-full border rounded-lg focus:outline-primary caret-primary'
        />
      </div>
      <div className='flex flex-row items-center justify-between'>
        <label
          className='w-[240px] body-m text-secondary-foreground'
          htmlFor='email'
        >
          Email
        </label>
        <input
          name='email'
          type='email'
          defaultValue={userDetails?.email}
          placeholder='e.g. email@example.com'
          className='px-4 py-3 w-full border rounded-lg focus:outline-primary caret-primary'
        />
      </div>
      <div className='flex md:place-content-end mt-5 md:mt-0 py-6  border-t'>
        <Button
          type='submit'
          className='md:w-[91px] w-full '
          variant={"default"}
        >
          Save
        </Button>
      </div>
    </form>
  );

  return (
    <div className='flex flex-col lg:flex-row gap-6'>
      <div className='p-6 bg-white rounded-xl min-w-[560px] hidden xl:flex items-center justify-center '>
        <Image className='relative ' src={preview} alt={"preview"} />
        <div className='absolute hidden xl:block'>
          {isLoading ? (
            <ProfileSkeleton />
          ) : (
            <div className='flex flex-col gap-14'>
              <div className='flex flex-col gap-[25px] items-center'>
                <Image
                  className='w-[96px] h-[96px] rounded-full border-4 border-primary'
                  src={profilePhoto}
                  alt=''
                  width='96'
                  height='96'
                />

                <div className='flex flex-col gap-[13px] items-center justify-center '>
                  <div className='heading-medium min-w-[160px] h-[16px] flex items-center justify-center'>
                    {userDetails?.firstName} {userDetails?.lastName}
                  </div>
                  <div className='body-medium w-[72px] h-[8px] flex items-center justify-center text-secondary-foreground'>
                    {userDetails.email}{" "}
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
          )}
        </div>
      </div>
      <div className='bg-white w-full rounded-xl flex flex-col md:gap-6 gap-10'>
        <div className='p-10 space-y-[60px]'>
          <div>
            <h1 className='heading-m'>Profile details</h1>
            <p className='body-m text-secondary-foreground'>
              Add your details to create a personal touch to your profile
            </p>
          </div>
          <div className='flex flex-col w-full gap-11'>
            <div className='flex flex-row items-center justify-between text-secondary-foreground'>
              <p className='body-m'>Profile picture</p>
              <div className='flex flex-row items-center justify-center gap-6'>
                <div className='relative  w-[193px] h-[193px] rounded-xl bg-primary-light flex flex-col items-center justify-center'>
                  {profilePhoto ? (
                    <Image
                      className='w-[193px] h-[193px] bg-contain'
                      src={profilePhoto}
                      alt='Profile'
                      width='193'
                      height='193'
                    />
                  ) : (
                    <>
                      <Image src={img} alt='' width='40' height='40' />
                    </>
                  )}

                  <div className='absolute flex flex-col items-center justify-center bg-black/40 w-full h-full'>
                    <Image src={img2} alt='' />

                    <p
                      onClick={handleClick}
                      role='button'
                      className={`heading-s ${
                        profilePhoto ? "text-white" : "text-primary"
                      }`}
                    >
                      {profilePhoto ? "Change Image" : "+ Upload Image"}
                    </p>
                  </div>
                </div>
                <input
                  type='file'
                  id='profilePhotoInput'
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept='image/*'
                  style={{ display: "none" }}
                />

                <p className='body-s'>
                  Image must be below 1024x1024px. <br /> Use PNG or JPG format
                </p>
              </div>
            </div>

            {editForm}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
