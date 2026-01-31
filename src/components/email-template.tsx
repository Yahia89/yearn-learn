import * as React from 'react';

interface ContactEmailProps {
  name: string;
  email: string;
  phone: string;
  message: string;
  studentGrade?: string;
  subject?: string;
}

export const ContactEmail: React.FC<Readonly<ContactEmailProps>> = ({
  name,
  email,
  phone,
  message,
  studentGrade,
  subject,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
    <h1 style={{ color: '#FF9F1C' }}>New Inquiry from Yearn & Learn</h1>
    <p><strong>Name:</strong> {name}</p>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Phone:</strong> {phone}</p>
    <p><strong>Student Grade:</strong> {studentGrade || 'Not specified'}</p>
    <p><strong>Subject of Interest:</strong> {subject || 'Not specified'}</p>
    <hr />
    <h3>Message:</h3>
    <p style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
  </div>
);
