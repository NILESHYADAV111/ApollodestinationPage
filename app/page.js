import React from 'react';
import styles from './page.module.css';
import { GoDotFill } from "react-icons/go";
import Link from 'next/link';
import Image from 'next/image';

const page = async ( { searchParams} ) => {
  

  const search = searchParams?.search || '';
  const pageNum = parseInt(searchParams?.page || '1');
  const limit = parseInt(searchParams?.limit || '10')



  const query = new URLSearchParams({ search, page: pageNum, limit }).toString();

  const res = await fetch(`http://localhost:3000/api/list-doctor-with-filter?${query}`, {
    cache: 'no-store'
  });

  const data = await res.json();
  const doctors = data.doctors;
  const total = data.total;
  const totalPages = Math.ceil(total / limit);
  console.log(searchParams);

  
  const createPageLink = async(pageValue) => {
    const query = [];
  
    for (const key in  await searchParams) {
      if (key !== "page") {
        query.push(`${key}=${encodeURIComponent(searchParams[key])}`);
      }
    }
  
    query.push(`page=${pageValue}`);
    return `?${query.join("&")}`;
  };
  
  
  

  return (
    <div className={styles.destination_page_main}>
      <form className={styles.search_header} method="GET">
        <input 
          type="text" 
          name="search" 
          placeholder="Search by city, specialization, or degree" 
          defaultValue={search} 
        />
      </form>

      {doctors.length > 0 ? (
        doctors.map((doctor) => (
          <div key={doctor._id} className={styles.doctor_list}>
            <div className={styles.doctor_image}>
              <Image src={doctor.image} alt={doctor.name} width={80} height={80}  />
            </div>
            <div className={styles.doctor_detail}>
              <p>Dr. {doctor.name}</p>
              <p>{doctor.specialization}</p>
              <div className={styles.degree_experience}>
                <p>{doctor.experience} Years</p>
                <p>
                  <GoDotFill className={styles.dot} /> {doctor.degree}
                </p>
              </div>
              <p>{doctor.city}</p>
              <p>{doctor.clinicName}, {doctor.city}</p>
            </div>
            <div className={styles.doctor_fees}>
              <div className={styles.doctorvisit}>
                <p>₹ {doctor.onLineFee}</p>
                <button>Consult Online</button>
              </div>
              <div className={styles.doctor_online}>
                <p>₹ {doctor.visitFee}</p>
                <button>Visit Doctor</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.nodoctorfound} >No doctors found matching your criteria.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <Link
              key={i + 1}
              href={createPageLink(i + 1)}
              className={`${styles.page_link} ${i + 1 === pageNum ? styles.active : ''}`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      )}
      <Link href="/add-doctor">
        <button className={styles.addDoctor}>add-Doctor</button>
      </Link>
    </div>
  );
};

export default page;
