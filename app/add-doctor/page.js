"use client"

import React  from 'react'
import styles from './doctorPage.module.css'
import DoctorImageupload from './DoctorImageupload';
import Head  from 'next/head';
import Link from 'next/link';

// export const metadata = {
//     title: 'Add Doctor | Admin Panel',
//     description: 'Admin interface to add and manage doctor profiles.',
//   };



const page = () => {

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
       

        try{
            const res = await fetch("api/add",{
                method:"POST",
                body:formData

            });

            const result = await res.json();
            console.log(result);

            if(res.ok){
                alert(result.message);
            }else{
                alert(result.message);
            }
            
        }catch(error){
            console.log("Error submitting form:",error);
            alert('An error occurred while submitting the form.');
        }
    }
    

    
  return (
    <main className={styles.doctor_admin_page_main}>


      <Head>
        <title>Add Doctor | Admin Panel</title>
        <meta name="description" content="Admin interface to add and manage doctor profiles." />
      </Head>

        <div className={styles.left_sidebar}> 
                <ul>
                    <li>Add Doctor</li>

                    <Link href="/">
                       <li>Go To Home page</li>
                    </Link> 
                </ul>   
        </div>


 
        <form onSubmit={handleSubmit} method='POST' encType='multipart/form-data'>  
        <div className={styles.doctor_information_part}>
         
        <div className={styles.input_group}>
            <label htmlFor="DoctorName">Doctor Name</label>
            <input type="text" name='name' />
        </div>

        <div className={styles.input_group}>
            <label htmlFor="Specialization">Specialization</label>
            <input type="text" name="specialization" />
        </div>

        <div className={styles.input_group}>
            <label htmlFor="Experience">Experience</label>
            <input type="number" name='experience' />
        </div>

        <div className={styles.input_group}>
            <label htmlFor="Degrees">Degrees</label>
            <select id="degree" name="degree">
               <option value="mbbs">MBBS</option>
               <option value="md">MD</option>
               <option value="ms">MS</option>
               <option value="dm">DM</option>
               <option value="mch">MCh</option>
               <option value="dnb">DNB</option>
               <option value="do">DO</option>
               <option value="mph">MPH</option>
               <option value="phd">PhD</option>
               <option value="bds">BDS</option>
               <option value="bams">BAMS</option>
               <option value="bhms">BHMS</option>
            </select>
        </div>

        <div className={styles.input_group}>
            <label htmlFor="City" >City</label>
            <input type="text" name="city" />
        </div>

        <div className={styles.input_group}>
            <label htmlFor="ClinicName">Clinic Name</label>
            <input type="text"name='clinicName' />
        </div>

        <div className={styles.input_group}>
            <label htmlFor="Consultation Fee">Online Fee</label>
            <input type="number" name='onLineFee' />
        </div>

        <div className={styles.input_group}>
            <label htmlFor="CashbackOffer">Visit Fee</label>
            <input type="number" name='visitFee' />
        </div>


         <DoctorImageupload/>
        </div>

        <button type='submit' style={{padding:"0.6rem 2rem",marginLeft:"2.5rem"}}>submit</button>

        </form>





    </main>
  )
}

export default page
