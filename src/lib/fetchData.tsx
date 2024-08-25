// profileUtils.ts
import { db, UserDetails } from "~/lib/dexie";
import { auth } from "~/lib/request";
import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import disk from "~/assets/disk.svg";

export const setDataFromDb = async (
  setUserDetail: React.Dispatch<React.SetStateAction<UserDetails>>,
  setProfilePhoto: React.Dispatch<React.SetStateAction<string>>,
  userEmail: any
) => {
  const userDetailsFromDb = await db.bio.get("info");
  const profilePhotoFromDb = await db.bio.get("profilePhoto");

  if (userDetailsFromDb && userDetailsFromDb.value) {
    setUserDetail({
      ...userDetailsFromDb.value,
      email: userEmail ?? "", // Set email from Firebase auth, default to empty string if null or undefined
    });
  } else {
    setUserDetail((prevDetails) => ({
      ...prevDetails,
      email: userEmail ?? "", // Set email from Firebase auth, default to empty string if null or undefined
    }));
  }

  if (profilePhotoFromDb && profilePhotoFromDb.value) {
    setProfilePhoto(profilePhotoFromDb.value as string);
  }
};

export const updateUserDetails = async (
  e: React.FormEvent<HTMLFormElement>,
  setUserDetail: React.Dispatch<React.SetStateAction<UserDetails>>,
  setEditFormIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
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
  toast("Your changes have been successfully saved!", {
    icon: <Image src={disk} alt='save' />,
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fafafa",
      fontSize: "14px",
      fontWeight: "600",
    },
  });
  setEditFormIsOpen(false);
};

export const handleFileChange = async (
  event: React.ChangeEvent<HTMLInputElement>,
  setProfilePhoto: React.Dispatch<React.SetStateAction<string>>
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

export const handleAuthStateChanged = (
  setUserDetail: React.Dispatch<React.SetStateAction<UserDetails>>,
  setProfilePhoto: React.Dispatch<React.SetStateAction<string>>,
  setDataFromDb: () => Promise<void>
) => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, reset state
      setUserDetail({
        firstName: "",
        lastName: "",
        email: "",
      });
      setProfilePhoto("");
      setDataFromDb();
    } else {
      // User is signed out, reset state
      setUserDetail({
        firstName: "",
        lastName: "",
        email: "",
      });
      setProfilePhoto("");
    }
  });
};
