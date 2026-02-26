"use client";

import { AuthWrapper } from "@/components/auth/AuthWrapper";
import { RegisterFormOptimized } from "@/components/auth/RegisterFormOptimized";

export default function RegisterPage() {
  return (
    <AuthWrapper
      headerTitle="Create an account"
      headerDescription="Enter your information below to create your account"
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/login"
    >
      <RegisterFormOptimized />
    </AuthWrapper>
  );
}
