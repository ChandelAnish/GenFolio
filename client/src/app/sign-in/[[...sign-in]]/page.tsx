// dedicated sign in page on our domain.

import { SignIn } from '@clerk/nextjs'
import React from 'react'

export default function SignInPage() {
  return (
    <div className='flex justify-center items-center min-h-screen bg-[#131829]'>
      <SignIn 
        appearance={{
          variables: {
            colorBackground: '#1A202C',
            colorPrimary: '#3B82F6',
            colorText: '#FFFFFF',
            colorTextSecondary: '#A0AEC0',
            colorInputBackground: '#2D3748',
            colorInputText: '#FFFFFF',
          },
          elements: {
            card: 'bg-[#1a202c9d] shadow-xl',
            formButtonPrimary: 'bg-blue-500 hover:bg-blue-600',
            socialButtonsIconButton: 'bg-[#1A202C] border-gray-700 text-white',
            socialButtonsBlockButton: 'bg-[#1A202C] border-gray-700 text-white hover:bg-[#2D3748]'
          }
        }}
      />
    </div>
  )
}