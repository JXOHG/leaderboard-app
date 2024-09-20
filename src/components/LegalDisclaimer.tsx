// components/LegalDisclaimer.tsx
import React from 'react';

const LegalDisclaimer: React.FC = () => {
  return (
    <div className="legal-disclaimer">
      <h2>Legal Disclaimer</h2>

      <h3>1. Introduction</h3>
      <p>
        Welcome to the StairClimb fundraising event web application (the "Application"),
        developed by Tech for Social Impact in partnership with United Elgin-Way Middlesex.
        By accessing or using this Application, you agree to the following terms and conditions.
        If you do not agree, please do not use this Application.
      </p>

      <h3>2. Use of the Application</h3>
      <p>
        The Application is designed to collect and track step data from users participating
        in the StairClimb event. The data collected will be used to generate leaderboards
        and support fundraising efforts.
      </p>

      <h3>3. Data Accuracy</h3>
      <p>
        While we strive to ensure that the step tracking and leaderboard features are accurate,
        we make no warranties or representations regarding the accuracy or completeness of the data.
        Users are responsible for verifying their own step data and reporting any discrepancies.
      </p>

      <h3>4. Data Privacy</h3>
      <p>
        Your privacy is important to us. The data collected through the Application will be used solely
        for the purpose of the StairClimb event and associated fundraising activities. We will not share
        your personal information with third parties without your consent, except as required by law.
        For more information, please review our Privacy Policy.
      </p>

      <h3>5. Health and Safety</h3>
      <p>
        The Application is intended for use by individuals participating in the StairClimb event.
        It is important to consult with a healthcare professional before engaging in any physical activity,
        especially if you have any pre-existing health conditions. By using this Application, you acknowledge
        that Tech for Social Impact and United Elgin-Way Middlesex are not responsible for any health issues
        or injuries that may arise from participating in the StairClimb event.
      </p>

      <h3>6. Limitation of Liability</h3>
      <p>
        To the fullest extent permitted by law, Tech for Social Impact and United Elgin-Way Middlesex
        disclaim all liability for any direct, indirect, incidental, special, consequential, or punitive damages
        arising out of or in connection with your use of the Application. This includes, but is not limited to,
        any errors or omissions in the data, or any loss or damage to your device or data.
      </p>

      <h3>7. Changes to the Disclaimer</h3>
      <p>
        We may update this disclaimer from time to time. Your continued use of the Application after any changes
        indicates your acceptance of the new terms. Please review this disclaimer periodically.
      </p>

      <h3>8. Contact Us</h3>
      <p>
        If you have any questions or concerns about this disclaimer or the Application, please contact us at
        <a href="mailto:uwotsi@outlook.com"> uwotsi@outlook.com</a>.
      </p>
    </div>
  );
};

export default LegalDisclaimer;