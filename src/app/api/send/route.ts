import { ContactEmail } from '../../../components/email-template';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, studentGrade, subject } = body;

    // Send email to the tutor
    const data = await resend.emails.send({
      from: 'Yearn & Learn <onboarding@resend.dev>', // Update this with your verified domain later
      to: ['YEARNNDLEARN@GMAIL.COM'],
      subject: `New Tutoring Inquiry from ${name}`,
      react: await ContactEmail({ name, email, phone, message, studentGrade, subject }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
