// components/LegalDisclaimer.tsx
import React from 'react';

const LegalDisclaimer: React.FC = () => {
  return (
    <div className="legal-disclaimer">
      <h2 className="mulish-bold">Legal Disclaimer</h2>

      <h3 className="mulish-bold">1. Introduction</h3>
      <p className="mulish-regular">
        Welcome to the StairClimb fundraising event web application,
        developed by Tech for Social Impact for United Elgin-Way Middlesex.
        As an administrator, by accessing or using this application for inputting participant data,
        you agree to the terms outlined below. If you do not agree, please refrain from using this application.
      </p>

      <h3 className="mulish-bold">2. Role of Administrators</h3>
      <p className="mulish-regular">
        As an administrator, your primary role is to manage and input participant data accurately for the StairClimb event.
        This data may include step counts, participant details, and other related information.
        Your careful handling of this data ensures the smooth operation of the event, including the generation of leaderboards
        and support for fundraising efforts.
      </p>

      <h3 className="mulish-bold">3. Data Accuracy and Responsibility</h3>
      <p className="mulish-regular">
        While the application strives to maintain accurate tracking and reporting, administrators are responsible
        for verifying the accuracy of the data they input. Please ensure that all participant data is entered correctly,
        as it will directly impact event reporting and rankings. Any discrepancies or errors should be reported and corrected promptly.
      </p>

      <h3 className="mulish-bold">4. Data Privacy and Confidentiality</h3>
      <p className="mulish-regular">
        The data you input is crucial to the operation of the StairClimb event and will be handled with care.
        We are committed to safeguarding participants' privacy and will use this data solely for event and fundraising purposes.
        Administrators should not share participant information with unauthorized third parties.
      </p>

      <h3 className="mulish-bold">5. Contact Information</h3>
      <p className="mulish-regular">
        For any questions or concerns regarding this disclaimer, please contact us at
        <a href="mailto:uwotsi@outlook.com">uwotsi@outlook.com</a>.
      </p>
    </div>
  );
};

export default LegalDisclaimer;
