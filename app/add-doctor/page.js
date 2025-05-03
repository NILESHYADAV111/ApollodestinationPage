import React from 'react'
import styles from './doctorPage.module.css'


const page = () => {
  return (
    <div className={styles.doctor_admin_page_main}>
        <div className="input-group">
            <label htmlFor="DoctorName">Doctor Name</label>
            <input type="text" />
        </div>

        <div className="input-group">
            <label htmlFor="Specialization">Specialization</label>
            <input type="text" />
        </div>

        <div className="input-group">
            <label htmlFor="Experience">Experience</label>
            <input type="text" />
        </div>

        <div className="input-group">
            <label htmlFor="Degrees">Degrees</label>
            <input type="text" />
        </div>

        <div className="input-group">
            <label htmlFor="City">City</label>
            <input type="text" />
        </div>

        <div className="input-group">
            <label htmlFor="ClinicName">Clinic Name</label>
            <input type="text" />
        </div>

        <div className="input-group">
            <label htmlFor="Consultation Fee">Consultation Fee</label>
            <input type="text" />
        </div>

        <div className="input-group">
            <label htmlFor="CashbackOffer">Cashback Offer</label>
            <input type="text" />
        </div>

        <div className="input-group">
            <label htmlFor="Rating">Rating / Approval %</label>
            <input type="text" />
        </div>

        <div className="input-group">
            <label htmlFor="ProfileImageUpload">Profile Image Upload</label>
            <input type="text" />
        </div>





    </div>
  )
}

export default page
