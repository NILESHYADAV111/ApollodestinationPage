"use client"

import React,{ useRef, useState } from 'react'
import Image from 'next/image'
import styles from './doctorPage.module.css'



const DoctorImageupload = () => {
      const [imagePreview, setImagePreview] = useState("/demoImage.jpg");
       const fileInputRef = useRef(null);
   
       const handleInputClick = ()=>{
           fileInputRef.current.click();
   
       }
   
   
       const handlFileChange = (e)=>{
   
   
   
           const file = e.target.files[0];
   
           if (!file) {
               // User clicked cancel — do nothing, no alert
               return;
             }
           if(file && ['image/jpeg','image/png','image/jpg'].includes(file.type)){
               const reader = new FileReader();
   
               reader.onloadend = ()=>{
                   setImagePreview(reader.result);
               }
               reader.readAsDataURL(file);
           }else{
               alert('please select a jpeg or png or jpg file ');
           }
       }

  return (
    <div>
          <div className={styles.input_group}>
                  <label htmlFor="ProfileImageUpload">Profile Image Upload</label>
                  <input
                   type="file"
                   ref={fileInputRef}
                   name='image'
                   accept="image/png, image/jpg, image/jpeg"
                   onChange={handlFileChange}
                   style={{display:"none"}} 
                  />
             
      
      
             {imagePreview && (
               <Image
                 src={imagePreview}
                 width={120}
                 height={120}
                 alt='Picture of the doctor'
                 onClick={handleInputClick}
                 style={{
                   border: '2px solid black',
                   cursor: 'pointer',
                   }}
                 />
               )}
      
      </div>
    </div>
  )
}

export default DoctorImageupload
